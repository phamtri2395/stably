import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SPREAD_UPDATED_EVENT } from '@common/constants';
import { BidAskSpread } from '@schemas';

@WebSocketGateway({ path: '/spreads' })
export class SpreadGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SpreadGateway.name);

  @WebSocketServer() private readonly socket: Server;

  public afterInit(): void {
    this.logger.debug('Gateway init 🚀');
  }

  public handleConnection(client: Socket): void {
    this.logger.debug(`New client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  public updateSpread(spread: BidAskSpread): void {
    this.socket.emit(`${SPREAD_UPDATED_EVENT}_${spread.symbol}`, spread);
  }
}
