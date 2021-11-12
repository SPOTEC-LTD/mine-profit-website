import { EN, ZH } from '@@/i18n';

// only use require
require('dayjs/locale/zh-cn');
require('dayjs/locale/en');

const dayjsLocaleMap = {
  [EN]: 'en',
  [ZH]: 'zh-cn',
};

export {
  dayjsLocaleMap,
};
