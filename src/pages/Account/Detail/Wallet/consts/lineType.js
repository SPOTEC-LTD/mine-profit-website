export const LINE_USDT_ERC20 = 'USDT-ERC20';
export const LINE_USDT_TRC20 = 'USDT-TRC20';
export const LINE_USDT_OMNI = 'USDT-OMNI';
export const LINE_ERC20 = 'ERC20';
export const LINE_TRC20 = 'TRC20';
export const LINE_OMNI = 'OMNI';
export const COIN = 1;
export const LINE = 2;

export const lineList = [
  { text: LINE_ERC20, value: LINE_USDT_ERC20 },
  { text: LINE_TRC20, value: LINE_USDT_TRC20 },
  { text: LINE_OMNI, value: LINE_USDT_OMNI },
];

export const getLineType = line => {
  const lineTypeMap = {
    [LINE_ERC20]: LINE_USDT_ERC20,
    [LINE_TRC20]: LINE_USDT_TRC20,
    [LINE_OMNI]: LINE_USDT_OMNI,
  };
  return lineTypeMap[line];
};

export const getLineName = line => {
  const lineNameMap = {
    [LINE_USDT_ERC20]: LINE_ERC20,
    [LINE_USDT_TRC20]: LINE_TRC20,
    [LINE_USDT_OMNI]: LINE_OMNI,
  };
  return lineNameMap[line];
};

export const getType = (coinType, type) => {
  if (coinType && coinType.includes('USDT')) {
    return type === COIN ? 'USDT' : getLineName(coinType);
  }
  return coinType;
};
