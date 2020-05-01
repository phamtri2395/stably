import { DEFAULT_MONGO_URI } from '@common/constants';

export default {
  MONGO_URI: process.env.MONGO_URI || DEFAULT_MONGO_URI,
};
