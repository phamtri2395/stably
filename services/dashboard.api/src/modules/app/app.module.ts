import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { CONFIG_PATH_GLOB } from '@common/constants';
import { BinanceModule } from '@modules/binance';

import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.load(CONFIG_PATH_GLOB), BinanceModule],
  controllers: [AppController],
})
export class AppModule {}
