import { useState, useEffect } from 'react';
import {
  Row, Col, Timeline, Statistic, Select,
} from 'antd';
import { format } from 'date-fns/fp';

import { SOCKET_SPREAD_EVENT } from '@common/constants';
import { SupportedPairs } from '@common/configs';
import { createSocketClient } from '@common/socket';
import { useGetSpread, Spread } from '@api';

import styles from './styles.scss';

export const BidAskSpread: React.FC = () => {
  const [pair, setPair] = useState(SupportedPairs[0]);
  const [currentSpread, setCurrentSpread] = useState(Number.NaN);
  const [spreads, setSpreads] = useState([]);
  const firstFetchedSpreads = useGetSpread(pair).data || [];

  useEffect(() => {
    if (firstFetchedSpreads[0]) {
      setSpreads(firstFetchedSpreads);
      setCurrentSpread(firstFetchedSpreads[0].spread);
    }
  }, [firstFetchedSpreads]);

  const handleSocketUpdate = (updatedSpread: Spread): void => {
    const updatedSpreadHistory = [updatedSpread, ...spreads];
    updatedSpreadHistory.pop();

    setCurrentSpread(updatedSpread.spread);
    setSpreads(updatedSpreadHistory);
  };

  useEffect(() => {
    const spreadEvent = SOCKET_SPREAD_EVENT(pair);
    const socket = createSocketClient();
    socket.on(spreadEvent, handleSocketUpdate);

    return (): void => {
      socket.off(spreadEvent);
    };
  }, [pair, currentSpread]);

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
        <Timeline reverse pending="Updating...">
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
