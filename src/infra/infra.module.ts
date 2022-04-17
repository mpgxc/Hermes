import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { multerOptions } from './configs/multerOptions';
import { MessageController } from './http/controllers/message.controller';
import { TemplateController } from './http/controllers/template.controller';
import { MailQueueProvider } from './providers/queue/mail-queue.provider';
import { StorageFilesProvider } from './providers/storage/storage-files.provider';
import { TemplateParseProvider } from './providers/template/template-parse.provider';
import { SendMessageProcessor } from './queue/jobs/send-message.processor';
import { QueueName } from './queue/queue-container';
import { SendMessageMailService } from './send-message-mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_FROM}>`,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: QueueName.SendMessageQueue,
    }),
    MulterModule.register(multerOptions),
  ],
  providers: [
    MailQueueProvider,
    StorageFilesProvider,
    SendMessageProcessor,
    TemplateParseProvider,
    SendMessageMailService,
  ],
  controllers: [MessageController, TemplateController],
})
export class InfraModule {}
