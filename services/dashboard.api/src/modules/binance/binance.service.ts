import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BOOK_TICKER_API } from '@common/constants';
import { Ticker, TickerModel } from '@schemas';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);

  constructor(
    @InjectModel(TickerModel.name) private readonly tickerModel: Model<Ticker>,
    private readonly http: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async getOpenOrders(): Promise<void> {
    this.logger.debug('Getting ticker book...');

    const { data: tickers } = await this.http.get(BOOK_TICKER_API).toPromise();

    await this.tickerModel.create(tickers);

    this.logger.debug(`Inserted ${tickers.length} records ✨`);
  }
}
