import { useState, StatelessComponent } from 'react';

import { SupportedPairs } from '@common/configs';
import { useGetSpread } from '@api';

export const BidAskSpread: StatelessComponent = () => {
  const [pair, setPair] = useState(SupportedPairs[0]);
  const { data } = useGetSpread(pair);

  console.log('data', data);

  return <div>Bid-ask spread</div>;
};
