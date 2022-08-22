import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Cache } from 'cache-manager';
import handlebars from 'handlebars';
import { firstValueFrom } from 'rxjs';

import {
  ParseTemplateMail,
  ITemplateParseProvider,
} from './template-parse.interface';

@Injectable()
export class TemplateParseProvider implements ITemplateParseProvider {
  constructor(
    private readonly httpClient: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private buildTemplateURL(templateId: string): string {
    return `${this.configService.get<string>(
      'FIREBASE_BUCKET_PREVIEW_CONTENT',
    )}${templateId}.html?alt=media&token=${templateId}`;
  }

  async parse({
    templateId,
    templateProps,
  }: ParseTemplateMail): Promise<string> {
    const templateCacheKey = `template-${templateId}`;

    let template = await this.cacheManager.get<string>(templateCacheKey);

    if (!template) {
      const templateURL = this.buildTemplateURL(templateId);

      const { data } = await firstValueFrom(
        this.httpClient.get<string>(templateURL),
      );

      await this.cacheManager.set(templateCacheKey, data);

      template = data;
    }

    const compiledTemplate = handlebars.compile(template)(templateProps);

    return compiledTemplate.toString().big();
  }
}
