import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { MongooseModule } from '@nestjs/mongoose';

import { CONFIG_PATH_GLOB } from '@common/constants';

import { MigrationModule } from '@modules/migration';
import { BinanceModule } from '@modules/binance';
import { SpreadModule } from '@modules/spread';

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
    MigrationModule,
    BinanceModule,
    SpreadModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
