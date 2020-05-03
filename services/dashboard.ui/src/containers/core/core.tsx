import PropTypes, { InferProps } from 'prop-types';
import { notification } from 'antd';
import { SWRConfig } from 'swr';

import { swrConfig } from '@common/configs';

const Core = ({ children }: InferProps<typeof Core>): JSX.Element => (
  <SWRConfig
    value={{
      ...swrConfig,
      onLoadingSlow: (): void => notification.warn({ message: 'Network is slow 🐌' }),
      onError: (_, key): void => notification.error({ message: `Failed on ${key}` }),
    }}
  >
    {children}
  </SWRConfig>
);

Core.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Core.defaultProps = {
  children: null,
};

export { Core };
