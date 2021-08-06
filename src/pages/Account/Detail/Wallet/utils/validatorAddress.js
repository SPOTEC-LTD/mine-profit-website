import startsWith from 'lodash/startsWith';

export const validateAddress = (value, chainType) => {
  switch (chainType) {
    case 'BTC':
    case 'USDT-OMNI':
      return (value.length === 34
        && (startsWith(value, '1')
          || startsWith(value, '3')
          || startsWith(value, 'm')
          || startsWith(value, 'n')
        ))
        || (value.length === 42 && startsWith(value, 'bc'));
    case 'ETH':
    case 'USDT-ERC20':
      return value.length === 42
        && (startsWith(value, '0x')
          || startsWith(value, 'm')
          || startsWith(value, 'n'));
    case 'FIL':
      return value.length === 41 && startsWith(value, 'f');
    default:
      return false;
  }
};
