import { Controller, Get, Query } from '@nestjs/common';

import { BidAskSpread } from '@schemas';
import { SpreadService } from './spread.service';

@Controller('spreads')
export class SpreadController {
  constructor(private readonly spreadService: SpreadService) {}

  @Get()
  public findAllBySymbol(@Query('symbol') symbol: string, @Query('limit') limit: string): Promise<BidAskSpread[]> {
    return this.spreadService.findAllBySymbol(symbol, parseInt(limit, 10));
  }
}
