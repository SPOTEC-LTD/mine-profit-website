import SquareSwitchOutlined from 'ahoney/lib/icons/SquareSwitchOutlined';
import SquareLockOutlined from 'ahoney/lib/icons/SquareLockOutlined';
import {
  HASHRATE_ENOUGH,
  HASHRATE_NO_ENOUGH,
  HASHRATE_NUMBER_NO_ENOUGH,
} from '@/pages/Account/HashRate/consts/hashrateAmountType';
import { ORDINARY } from '@/pages/Account/HashRate/consts/pledgeSourceType';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import DateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';
import Notification from '@/shared/services/Notification';
import { transferHashratePath, pledgeHashratePath } from '@/router/consts/urls';
import { POWER_ON } from '@/shared/consts/powerStatus';
import Countdown from '@/shared/components/Countdown';
import FooterLayout from '../components/FooterLayout';
import AmountValue from '../components/AmountValue';
import styles from './index.less?module';

const CardFooter = {
  props: ['data', 'isVipHashrate'],

  methods: {
    pledgeAction({ isPledge, productTemplateId, hashrateType }) {
      if (isPledge === HASHRATE_ENOUGH) {
        locationServices.push(pledgeHashratePath, {
          params: { productTemplateId },
          query: { source: ORDINARY, hashrateType },
        });
        return;
      }

      const pledgeMessageMap = {
        [HASHRATE_NO_ENOUGH]: this.$t('hashratePledgeAllNotEnough'),
        [HASHRATE_NUMBER_NO_ENOUGH]: this.$t('hashratePledgeSameNotEnough'),
      };

      Notification.error(pledgeMessageMap[isPledge]);
    },

    getButtonDataSource(data) {
      return [
        {
          label: this.$t('typeTransfer'),
          icon: <SquareSwitchOutlined />,
          onClick: () => {
            locationServices.push(transferHashratePath, {
              params: { productTemplateId: data.productTemplateId },
              query: { source: ORDINARY, hashrateType: data.hashrateType, hasPowerOff: POWER_ON },
            });
          },
        },
        {
          label: this.$t('typePledge'),
          icon: <SquareLockOutlined />,
          disabled: data.isPledge !== HASHRATE_ENOUGH,
          onClick: () => this.pledgeAction(data),
        },
      ];
    },
    getVipHashrateFooter(data) {
      const startDate = DateUtils.formatDate(data.startTime, 'YYYY.MM.DD');
      const endDate = DateUtils.formatDate(data.endTime, 'YYYY.MM.DD');
      return (
        <div class={styles['vip-hashrate-footer']}>
          {
            data.remainTime ? (
              <Countdown
                className={styles['time-countdown']}
                deadline={ 1000 * data.remainTime}
                onFinish={() => this.$emit('refresh')}
              />

            ) : (
              <div class={styles['vip-hashrate-footer-time']}>
                <span>{this.$t('outPutTime')}</span>
                <span>{`${startDate}-${endDate}`}</span>
              </div>
            )
          }
        </div>
      );
    },
  },

  render() {
    const { data, isVipHashrate } = this;

    const rightContentNode = isVipHashrate ?
      this.getVipHashrateFooter(data)
      :
    <FooterButtonGroup dataSource={this.getButtonDataSource(data)} />;

    const leftContentNode = (
      <div class={styles['footer-left-content']}>
        <AmountValue data={data} />
        {isVipHashrate && <span class={styles.present}>{this.$t('present')}</span>}
      </div>
    );

    return (
      <FooterLayout
        scopedSlots={{
          leftContent: () => leftContentNode,
          rightContent: () => rightContentNode,
        }}
      />
    );
  },
};

export default CardFooter;
