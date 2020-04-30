import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { BinanceService } from './binance.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [BinanceService],
  controllers: [],
})
export class BinanceModule {}
