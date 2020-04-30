import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BOOK_TICKER_API } from '@common/constants';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);

  constructor(private readonly http: HttpService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async getOpenOrders(): Promise<void> {
    this.logger.debug('Getting open orders...');

    const data = await this.http.get(BOOK_TICKER_API).toPromise();
  }
}
