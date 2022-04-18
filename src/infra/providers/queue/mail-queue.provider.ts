import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { Queue } from 'bull';

import { MailMessage } from '../../queue/jobs/send-message.interfaces';
import { QueueJobName, QueueName } from '../../queue/queue-container';
import { IBullQueueProvider } from './bull-queue.interface';

@Injectable()
export class MailQueueProvider implements IBullQueueProvider {
  constructor(
    @InjectQueue(QueueName.SendMessageQueue) private readonly queue: Queue,
  ) {}

  async addMany(data: MailMessage[]): Promise<void> {
    const jobs = data.map(({ to, subject, template }) => ({
      name: QueueJobName.SendMessage,
      data: {
        to,
        subject,
        template,
      },
    }));

    await this.queue.addBulk(jobs);
  }
}
