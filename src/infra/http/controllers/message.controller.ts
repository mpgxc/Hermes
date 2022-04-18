import { Body, Controller, Post } from '@nestjs/common';

import { SendMessageMailService } from 'infra/send-message-mail.service';

import { MailMessageInput } from '../inputs/message.input';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly sendMessageMailService: SendMessageMailService,
  ) {}

  @Post('/send')
  async sendMessage(
    @Body()
    { recipients, subject, templateId, templateProps }: MailMessageInput,
  ): Promise<void> {
    await this.sendMessageMailService.sendMessage({
      subject,
      recipients,
      templateId,
      templateProps,
    });
  }
}
