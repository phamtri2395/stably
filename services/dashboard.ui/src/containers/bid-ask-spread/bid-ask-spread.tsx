import { useState, useEffect } from 'react';
import {
  Row, Col, Timeline, Statistic, Select,
} from 'antd';
import { format } from 'date-fns/fp';
import { getOr, reverse, take } from 'lodash/fp';

import { SOCKET_SPREAD_EVENT } from '@common/constants';
import { SupportedPairs } from '@common/configs';
import { prettyNumber } from '@common/utils';
import { createSocketClient } from '@common/socket';
import { useGetSpread, Spread } from '@api';

import styles from './styles.scss';

const socket = createSocketClient();
export const BidAskSpread: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState(SupportedPairs[0]);
  const [spreadHistory, setSpreadHistory] = useState([]);
  const [socketAt, setSocketAt] = useState(Date.now());
  const [socketData, setSocketData] = useState(null);

  // socket handler
  useEffect(() => {
    const event = SOCKET_SPREAD_EVENT(selectedPair);
    socket.on(event, (data: Spread) => {
      setSocketData(data);
      setSocketAt(Date.now());
    });

    return (): void => {
      socket.off(event);
      setSocketData(null);
    };
  }, [selectedPair]);
  // clean up socket on unmount
  useEffect(() => {
    return (): void => {
      socket.close();
    };
  }, []);

  // fetch bid-ask spread history
  const { data: spreadHistoryData } = useGetSpread({ symbol: selectedPair, options: { revalidateOnFocus: false } });
  useEffect(() => {
    setSpreadHistory(spreadHistoryData);
  }, [selectedPair, spreadHistoryData]);
  const currentSpread = getOr(NaN, '0.spread', spreadHistory);

  // update bid-ask spread via websocket
  useEffect(() => {
    if (socketData) setSpreadHistory(take(spreadHistory.length, [socketData, ...spreadHistory]));
  }, [socketAt]);

  const handleSelectPair = (pair: string): void => {
    setSelectedPair(pair);
  };

  return (
    <Row>
      <Col span={16}>
        <Row className={styles.formItem}>
          <Select defaultValue={selectedPair} onSelect={handleSelectPair}>
            {SupportedPairs.map((supportedPair) => (
              <Select.Option key={supportedPair} value={supportedPair}>
                {supportedPair}
              </Select.Option>
            ))}
          </Select>
        </Row>

        <Row className={styles.formItem}>
          <Statistic title="Current spread" value={prettyNumber(currentSpread)} />
        </Row>
      </Col>

      <Col span={8}>
        <Timeline reverse pending="Updating...">
          {reverse(spreadHistory).map((spread) => (
            // eslint-disable-next-line no-underscore-dangle
            <Timeline.Item key={spread._id}>
              {prettyNumber(spread.spread)}
              <span> - </span>
              {format('kk:mm:ss', new Date(spread.createdAt))}
            </Timeline.Item>
          ))}
        </Timeline>
      </Col>
    </Row>
  );
};
