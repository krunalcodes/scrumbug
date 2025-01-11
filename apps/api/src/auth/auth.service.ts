import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq } from 'drizzle-orm';
import { users } from 'src/database/database-schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthUser } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(users.email, loginDto.email),
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

    return await this.jwtService.signAsync(
      { sub: user.id },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: '24h' },
    );
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
