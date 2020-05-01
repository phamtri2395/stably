import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { MongooseModule } from '@nestjs/mongoose';

import { CONFIG_PATH_GLOB } from '@common/constants';
import { BinanceModule } from '@modules/binance';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.load(CONFIG_PATH_GLOB),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('connection').MONGO_URI,
      }),
      inject: [ConfigService],
    }),
    BinanceModule],
  controllers: [AppController],
})
export class AppModule {}
