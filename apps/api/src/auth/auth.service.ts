import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq } from 'drizzle-orm';
import { tokens, users } from 'src/database/database-schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthUser } from './auth.interface';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from 'src/email/email.service';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(users.email, registerDto.email),
    });
    if (user) {
      throw new HttpException(
        'An account with this email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    try {
      const token = nanoid(32);

      await this.drizzleService.db.transaction(async (tx) => {
        const [createdUser] = await tx
          .insert(users)
          .values({
            name: registerDto.name,
            displayName: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
          })
          .returning();
        await tx.insert(tokens).values({
          token,
          userId: createdUser.id,
          type: 'EMAIL_VERIFICATION',
        });
      });

      await this.emailService.sendEamilVerification({
        name: registerDto.name,
        email: registerDto.email,
        url: `${this.configService.get('APP_URL')}/verify-email/${token}`,
      });
    } catch (e) {
      this.logger.error(`Error registering user: `, e);
      throw new HttpException(
        'Something went wrong!!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(users.email, loginDto.email),
      columns: { createdAt: false, updatedAt: false },
    });
    if (!user) {
      throw new HttpException(
        'No user found with the provided details.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Incorrect password.', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: '24h' },
    );

    delete user.password;

    return {
      user,
      token,
    };
  }

  async me(user: IAuthUser) {
    const dbUser = await this.drizzleService.db.query.users.findFirst({
      columns: {
        password: false,
        createdAt: false,
        updatedAt: false,
      },
      with: {
        memberships: {
          columns: { role: true },
          with: { team: { columns: { id: true, name: true, domain: true } } },
        },
      },
      where: eq(users.id, user.sub),
    });

    if (!dbUser) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return dbUser;
  }
}
