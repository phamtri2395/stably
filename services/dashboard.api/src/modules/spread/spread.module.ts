import { Module } from '@nestjs/common';

import { SpreadGateway } from './spread.gateway';

@Module({
  providers: [SpreadGateway],
  controllers: [],
  exports: [SpreadGateway],
})
export class SpreadModule {}
