import { useState, useEffect } from 'react';
import {
  Row, Col, Timeline, Statistic, Select,
} from 'antd';
import { format } from 'date-fns/fp';

import { SupportedPairs } from '@common/configs';
import { useGetSpread } from '@api';

import styles from './styles.scss';

export const BidAskSpread: React.FC = () => {
  const [pair, setPair] = useState(SupportedPairs[0]);
  const [currentSpread, setCurrentSpread] = useState(Number.NaN);

  const spreads = useGetSpread(pair).data || [];

  useEffect(() => {
    if (spreads[0]) setCurrentSpread(spreads[0].spread);
  }, [spreads]);

  const handleSelectPair = (selectedPair: string): void => {
    setPair(selectedPair);
  };

  return (
    <Row>
      <Col span={16}>
        <Row className={styles.formItem}>
          <Select defaultValue={pair} onSelect={handleSelectPair}>
            {SupportedPairs.map((supportedPair) => (
              <Select.Option key={supportedPair} value={supportedPair}>
                {supportedPair}
              </Select.Option>
            ))}
          </Select>
        </Row>

        <Row className={styles.formItem}>
          <Statistic title="Current spread" value={currentSpread} />
        </Row>
      </Col>

      <Col span={8}>
        <Timeline>
          {spreads.map((spread) => (
            // eslint-disable-next-line no-underscore-dangle
            <Timeline.Item key={spread._id}>
              {spread.spread.toFixed(2)}
              <span> - </span>
              {format('kk:mm:ss', new Date(spread.createdAt))}
            </Timeline.Item>
          ))}
        </Timeline>
      </Col>
    </Row>
  );
};
