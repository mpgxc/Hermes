import { Injectable } from '@nestjs/common';

import { MailQueueProvider } from './providers/queue/mail-queue.provider';
import { TemplateParseProvider } from './providers/template/template-parse.provider';
import { MailMessageInput } from './queue/jobs/send-message.interfaces';

@Injectable()
export class SendMessageMailService {
  constructor(
    private readonly queueMailProvider: MailQueueProvider,
    private readonly templateProvider: TemplateParseProvider,
  ) {}

  async sendMessage({
    subject,
    recipients,
    templateId,
    templateProps,
  }: MailMessageInput): Promise<void> {
    const template = await this.templateProvider.parse({
      templateId,
      templateProps,
    });

    await this.queueMailProvider.addMany(
      recipients.map((to) => ({
        to,
        subject,
        template,
      })),
    );
  }
}
