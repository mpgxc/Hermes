import { Module } from '@nestjs/common';

import { CommonsModule } from './commons/commons.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, CommonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
