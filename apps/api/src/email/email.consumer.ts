import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  private logger = new Logger(EmailConsumer.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<any, void, string>): Promise<void> {
    this.logger.log(job.data);
    switch (job.name) {
      case 'verification-mail':
        await this.mailerService
          .sendMail({
            to: job.data.email,
            subject: 'Email Verification Pending',
            template: 'email-verification',
            context: job.data,
          })
          .catch((err) => {
            this.logger.error('Error sending email: ', err);
          });
        break;
      case 'reset-password-mail':
        this.mailerService
          .sendMail({
            to: job.data.email,
            subject: 'Set your new Atlassian password',
            template: 'reset-password',
            context: job.data,
          })
          .catch((e) => {
            this.logger.error('Error sending reset password mail', e);
          });
    }
  }
}
