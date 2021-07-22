import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';

const getFormatBigNumber = value => (value ? bigNumberToFixed(value, 8) : '--');

export default getFormatBigNumber;
