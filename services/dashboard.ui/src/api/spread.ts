import useSWR, { responseInterface } from 'swr';

import { DEFAULT_SPREAD_LIMIT } from '@common/constants';

export interface Spread {
  _id: string;
  symbol: string;
  askPrice: number;
  bidPrice: number;
  spread: number;
  createdAt: Date;
  updatedAt: Date;
}

export const useGetSpread = (symbol: string, limit?: number): responseInterface<Spread[], object> => {
  return useSWR(`/spreads?symbol=${symbol}&limit=${limit || DEFAULT_SPREAD_LIMIT}`);
};
