import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { IEmailVerification } from './email.interface';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}
  async sendEamilVerification(data: IEmailVerification) {
    await this.emailQueue.add('verification-mail', data);
  }
}
