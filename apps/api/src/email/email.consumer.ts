import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  private logger = new Logger(EmailConsumer.name);

  constructor() {
    super();
  }

  async process(job: Job<any, void, string>): Promise<void> {
    this.logger.log(job.data);
  }
}
