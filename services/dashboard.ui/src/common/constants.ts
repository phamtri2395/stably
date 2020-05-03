export const GLOBAL_TITLE = 'Bid-ask spread';

export const DEFAULT_SPREAD_LIMIT = 10;

export const SOCKET_SPREAD_EVENT = (symbol: string): string => `SPREAD_UPDATED_EVENT_${symbol.toUpperCase()}`;
export const SOCKET_SPREAD_PATH = '/spreads';
