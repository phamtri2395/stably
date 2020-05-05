import prettyNum, { PRECISION_SETTING } from 'pretty-num';

export const prettyNumber = (number: number): string => {
  return prettyNum(number, { precision: 3, precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT });
};
