import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { TickerModel, BidAskSpreadModel } from '@schemas';
import { BinanceService } from './binance.service';

@Module({
  imports: [
    MongooseModule.forFeature([TickerModel, BidAskSpreadModel]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [BinanceService],
  controllers: [],
})
export class BinanceModule {}
