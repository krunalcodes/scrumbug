import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IDatabaseOptions } from './database-options';

export const CONNECTION_POOL = 'CONNECTION_POOL';

export const {
  ConfigurableModuleClass: ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS,
} = new ConfigurableModuleBuilder<IDatabaseOptions>()
  .setClassMethodName('forRoot')
  .build();