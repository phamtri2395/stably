import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BidAskSpread, BidAskSpreadModel } from '@schemas';

@Injectable()
export class SpreadService {
  private readonly logger = new Logger(SpreadService.name);

  constructor(@InjectModel(BidAskSpreadModel.name) private readonly bidAskSpreadModel: Model<BidAskSpread>) {}

  public findAllBySymbol(symbol: string, limit?: number): Promise<BidAskSpread[]> {
    return this.bidAskSpreadModel
      .find({ symbol })
      .sort({ createdAt: -1 })
      .limit(limit || 20)
      .exec();
  }
}
