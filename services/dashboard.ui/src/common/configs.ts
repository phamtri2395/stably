import { ConfigInterface } from 'swr';

import { fetcher } from '@common/fetcher';

export const swrConfig: ConfigInterface = {
  fetcher,
  initialData: null,
  refreshInterval: 0,
  shouldRetryOnError: false,
  errorRetryInterval: 0,
  revalidateOnFocus: true,
  dedupingInterval: 300,
};

export const SupportedPairs = ['BTCUSDC', 'BTCEUR', 'ETHBTC'];
