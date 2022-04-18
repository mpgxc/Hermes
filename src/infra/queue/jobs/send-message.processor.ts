import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';

import { QueueJobName, QueueName } from '../queue-container';
import { MailMessage } from './send-message.interfaces';

@Processor(QueueName.SendMessageQueue)
export class SendMessageProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process(QueueJobName.SendMessage)
  async sendMessage(job: Job<MailMessage>): Promise<void> {
    const { to, subject, template } = job.data;

    await this.mailService.sendMail({
      to,
      html: template,
      subject,
    });
  }
}
