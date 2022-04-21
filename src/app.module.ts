import { Module } from '@nestjs/common';

import { ApplicationModule } from 'application/application.module';

import { CommonsModule } from './commons/commons.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, ApplicationModule, CommonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
