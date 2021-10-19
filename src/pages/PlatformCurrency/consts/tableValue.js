import locale from '@/shared/intl/utils/locale';

export const columns = () => [
  {
    title: locale.t('days'),
  },
  {
    title: locale.t('currencyPriceMultiple'),
    subTitle: locale.t('noRepurchaseOccurs'),
    small: true,
  },
  {
    title: locale.t('currencyPriceMultiple'),
    subTitle: locale.t('completeDailyRepurchase'),
    small: true,
  },
];

export const dataSource = () => [
  [`${locale.t('increaseDay', { day: 1 })}`, '1', '1'],
  [`${locale.t('increaseDay', { day: 180 })}`, '180', '257.13'],
  [`${locale.t('increaseDay', { day: 360 })}`, '540', '1253.26'],
  [`${locale.t('increaseDay', { day: 540 })}`, '1260', '5250.30'],
  [`${locale.t('increaseDay', { day: 720 })}`, '2700', '21237.84'],
  [`${locale.t('increaseDay', { day: 900 })}`, '5580', '85187.30'],
  [`${locale.t('increaseDay', { day: 1080 })}`, '11340', '340984.50'],
  [`${locale.t('increaseDay', { day: 1260 })}`, '22860', '1364172.63'],
  [`${locale.t('increaseDay', { day: 1440 })}`, '34380', '3327623.94'],
  [`${locale.t('increaseDay', { day: 1620 })}`, '45900', '7495705.57'],
  [`${locale.t('increaseDay', { day: 1800 })}`, '57420', '15667929.77'],
];
