import { Injectable } from '@nestjs/common';

import slugify from 'slugify';

@Injectable()
class SlugProvider {
  public generate(title: string): string {
    return slugify(title, {
      trim: true,
      lower: true,
    });
  }
}

export { SlugProvider };
