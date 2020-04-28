import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { CONFIG_PATH_GLOB } from '@common/constants';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.load(CONFIG_PATH_GLOB)],
  controllers: [AppController],
})
export class AppModule {}
