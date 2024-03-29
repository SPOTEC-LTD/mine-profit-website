/* eslint-disable quote-props */
import startsWith from 'lodash/startsWith';

export const validateAddress = (value, chainType) => {
  const ruleTypeOne = value.length >= 26 && value.length <= 34
    && (startsWith(value, '1') || startsWith(value, 'm') || startsWith(value, 'n'));

  const ruleTypeTwo = value.length === 42
    && (startsWith(value, '0x') || startsWith(value, 'm') || startsWith(value, 'n'));

  const rule3 = value.length === 34 && startsWith(value, '3');

  const ruleBc1 = value.length > 34 && startsWith(value, 'bc1');

  const filRules = value.length === 41 && startsWith(value, 'f');

  const trc20Rules = startsWith(value, 'T');

  const validateMap = {
    'BTC': ruleTypeOne || rule3 || ruleBc1,
    'USDT-OMNI': ruleTypeOne || rule3,
    'ETH': ruleTypeTwo,
    'MPT': ruleTypeTwo, // TODO: 待改动态
    'USDT-ERC20': ruleTypeTwo,
    'USDT-TRC20': trc20Rules,
    'FIL': filRules,
  };

  return !!validateMap[chainType];
};
