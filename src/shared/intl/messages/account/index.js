import wallet from './wallet';
import hashRate from './hashRate';
import investment from './investment';
import mine from './mine';
import orders from './orders';

export default {
  ...wallet,
  ...hashRate,
  ...investment,
  ...mine,
  ...orders,
};
