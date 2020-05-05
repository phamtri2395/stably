import useSWR, { responseInterface, ConfigInterface } from 'swr';

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

export const useGetSpread = ({
  symbol,
  limit = DEFAULT_SPREAD_LIMIT,
  options,
}: {
  symbol: string;
  limit?: number;
  options?: ConfigInterface;
}): responseInterface<Spread[], object> => {
  return useSWR(`/spreads?symbol=${symbol}&limit=${limit}`, options);
};
