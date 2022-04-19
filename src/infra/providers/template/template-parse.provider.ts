import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import handlebars from 'handlebars';

import {
  ParseTemplateMail,
  ITemplateParseProvider,
} from './template-parse.interface';

@Injectable()
export class TemplateParseProvider implements ITemplateParseProvider {
  constructor(
    private readonly httpClient: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async parse({
    templateId,
    templateProps,
  }: ParseTemplateMail): Promise<string> {
    const templateURL = `${this.configService.get<string>(
      'FIREBASE_BUCKET_PREVIEW_CONTENT',
    )}${templateId}.html?alt=media&token=${templateId}`;

    const { data } = await this.httpClient.get(templateURL).toPromise();

    return handlebars.compile(data)(templateProps).toString().big();
  }
}
