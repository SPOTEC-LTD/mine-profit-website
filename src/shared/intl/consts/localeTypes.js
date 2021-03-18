import { CN, US } from './languages';

// only use require
require('dayjs/locale/zh-cn');
require('dayjs/locale/en');

const dayjsLocaleMap = {
  [US]: 'en',
  [CN]: 'zh-cn',
};

export {
  dayjsLocaleMap,
};
