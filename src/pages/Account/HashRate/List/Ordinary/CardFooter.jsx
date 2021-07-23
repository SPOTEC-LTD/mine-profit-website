import { Statistic } from 'ant-design-vue';
import {
  HASHRATE_ENOUGH,
  HASHRATE_NO_ENOUGH,
  HASHRATE_NUMBER_NO_ENOUGH,
} from '@/pages/Account/HashRate/consts/hashrateAmountType';
import {
  SquareSwitchOutlined,
  SquareLockOutlined,
} from 'ahoney/lib/icons';
import { ORDINARY } from '@/pages/Account/HashRate/consts/pledgeSourceType';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import DateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';
import FooterLayout from '../components/FooterLayout';
import AmountValue from '../components/AmountValue';
import styles from './index.less?module';

const CardFooter = {
  props: ['data', 'isVipHashrate'],

  methods: {
    pledgeAction({ isPledge, productTemplateId, hashrateType }) {
      if (isPledge === HASHRATE_ENOUGH) {
        locationServices.push('pledgeHashratePath', {
          params: { productTemplateId },
          query: { source: ORDINARY, hashrateType },
        });
        return;
      }

      const pledgeMessageMap = {
        [HASHRATE_NO_ENOUGH]: this.$t('hashratePledgeAllNotEnough'),
        [HASHRATE_NUMBER_NO_ENOUGH]: this.$t('hashratePledgeSameNotEnough'),
      };
    },

    getButtonDataSource(data) {
      return [
        {
          label: this.$t('typeTransfer'),
          icon: <SquareSwitchOutlined />,
          onClick: () => { console.log('----typeTransfer') },
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
      const format = this.$t('remainTime', {
        day: 'DD',
        hour: 'HH',
        minute: 'mm',
        second: 'ss',
      });
      return (
        <div class={styles['vip-hashrate-footer']}>
          {
            data.remainTime ? (
              <Statistic.Countdown
                class={styles['time-countdown']}
                value={Date.now() + 1000 * data.remainTime}
                format={format}
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
