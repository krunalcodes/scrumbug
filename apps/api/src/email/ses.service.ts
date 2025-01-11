import { SESClient } from '@aws-sdk/client-ses';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class SESService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const ses = new SESClient({
      region: this.configService.get('AWS_REGION'),
    });

    const transport = nodemailer.createTransport({ SES: { ses, aws } });

    return {
      transport: transport.transporter,
      defaults: {
        from: this.configService.get('MAIL_FROM'),
      },
      template: {
        dir: path.join(process.cwd(), 'src/email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
