import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService, EmailConsumer],
})
export class EmailModule {}
