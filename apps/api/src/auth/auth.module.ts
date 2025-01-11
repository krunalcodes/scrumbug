import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { EmailService } from 'src/email/email.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    BullModule.registerQueue({ name: 'email' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    ConfigService,
    JwtStrategy,
    EmailService,
  ],
})
export class AuthModule {}
