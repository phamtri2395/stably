import useSWR, { responseInterface } from 'swr';

export const getSpreadHistory = (): responseInterface<object, object> => {
  const initialData = null;

  return useSWR('127.0.0.1/spreads?symbol=BTCUSDC', { initialData });
};
