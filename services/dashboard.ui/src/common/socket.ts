import url from 'url';
import socketClient from 'socket.io-client';

import { SOCKET_SPREAD_PATH } from '@common/constants';

const API_BASE = url.format({
  protocol: process.env.API_PROTOCOL,
  hostname: process.env.API_HOSTNAME,
  port: process.env.API_PORT,
});

export const createSocketClient = (): SocketIOClient.Socket => socketClient(API_BASE, { path: SOCKET_SPREAD_PATH });
