import { Injectable } from '@nestjs/common';

import axios from 'axios';

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
    emails,
    subject,
    templateId,
    templateProps,
  }: MailMessageInput): Promise<void> {
    const { data } = await axios.get(
      `https://firebasestorage.googleapis.com/v0/b/temvagas-5501c.appspot.com/o/email-sample.html?alt=media&token=aa5b515b-e41a-4686-8b24-9bd916e77179`,
    );

    const template = await this.templateProvider.parse({
      file: data,
      props: templateProps,
    });

    await this.queueMailProvider.addMany(
      emails.map((email) => ({
        email,
        subject,
        template,
      })),
    );
  }
}
