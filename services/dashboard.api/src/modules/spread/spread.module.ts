import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BidAskSpreadModel } from '@schemas';
import { SpreadGateway } from './spread.gateway';
import { SpreadService } from './spread.service';
import { SpreadController } from './spread.controller';

@Module({
  imports: [MongooseModule.forFeature([BidAskSpreadModel])],
  providers: [SpreadGateway, SpreadService],
  controllers: [SpreadController],
  exports: [SpreadGateway],
})
export class SpreadModule {}
