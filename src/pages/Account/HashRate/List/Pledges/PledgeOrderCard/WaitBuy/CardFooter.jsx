import { Statistic } from 'ant-design-vue';
import SharedFilled from 'ahoney/lib/icons/SharedFilled';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import locationServices from '@/shared/services/location/locationServices';
import { hashrateStatusMap } from '@/modules/account/hashRate';
import PledgeStatusTag from '../components/PledgeStatusTag';
import styles from './index.less?module';

const CardFooter = {
  props: ['data'],

  methods: {
    getButtonDataSource(id) {
      return [
        {
          label: this.$t('transferShare'),
          icon: <SharedFilled />,
          onClick: () => {
            locationServices.push('sharePath', { query: { id, activeName: hashrateStatusMap.PLEDGES } });
          },
        },
      ];
    },
  },

  render() {
    const { data } = this;
    const format = this.$t('remainTimeMS', {
      minute: 'mm',
      second: 'ss',
    });

    const topExtra = (
      <div class={styles['count-down-box']}>
        <span>{this.$t('pledgeAutoCancelTips')}</span>
        <div class={styles['count-down']}>
          <Statistic.Countdown
            value={Date.now() + 1000 * data.remainTime}
            format={format}
            onFinish={() => this.$emit('refresh')}
          />
        </div>
        <span class={styles.cancel} onClick={() => { this.isVisibleModal = true; }} >{this.$t('pledgeCancel')}</span>
      </div>
    );

    return (
      <FooterLayout
        scopedSlots={{
          topExtra: () => topExtra,
          leftContent: () => <PledgeStatusTag status={data.status} />,
          rightContent: () => <FooterButtonGroup dataSource={this.getButtonDataSource(data.id)} />,
        }}
      />
    );
  },
};

export default CardFooter;
