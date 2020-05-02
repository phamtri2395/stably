import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { TickerModel, BidAskSpreadModel } from '@schemas';
import { SpreadModule } from '@modules/spread';
import { BinanceService } from './binance.service';

@Module({
  imports: [
    MongooseModule.forFeature([TickerModel, BidAskSpreadModel]),
    ScheduleModule.forRoot(),
    HttpModule,
    SpreadModule,
  ],
  providers: [BinanceService],
  controllers: [],
})
export class BinanceModule {}
