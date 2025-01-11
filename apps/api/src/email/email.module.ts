import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SESService } from './ses.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'email' }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, SESService],
      useClass: SESService,
    }),
  ],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService, EmailConsumer],
})
export class EmailModule {}
