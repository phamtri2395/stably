import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'ramda';

import { BOOK_TICKER_API } from '@common/constants';
import {
  Ticker, TickerModel, BidAskSpread, BidAskSpreadModel,
} from '@schemas';
import { SpreadGateway } from '@modules/spread';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);

  constructor(
    @InjectModel(TickerModel.name) private readonly tickerModel: Model<Ticker>,
    @InjectModel(BidAskSpreadModel.name) private readonly bidAskSpreadModel: Model<BidAskSpread>,
    private readonly http: HttpService,
    private readonly spreadGateway: SpreadGateway,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async getOpenOrders(): Promise<void> {
    this.logger.debug('Getting ticker book...');

    const { data: tickers } = await this.http.get(BOOK_TICKER_API).toPromise();
    const spreads = map(({ symbol, askPrice, bidPrice }) => {
      const spread = askPrice - bidPrice;
      const record = {
        symbol,
        askPrice: parseFloat(askPrice.toString()),
        bidPrice: parseFloat(bidPrice.toString()),
        spread,
      };

      return record;
    }, <BidAskSpread[]>tickers);

    const [_, spreadRecords] = await Promise.all([
      this.tickerModel.create(tickers),
      this.bidAskSpreadModel.create(spreads),
    ]);

    spreadRecords.forEach((record) => this.spreadGateway.updateSpread(record));

    this.logger.debug(`Processed ${tickers.length} records ✨`);
  }
}
