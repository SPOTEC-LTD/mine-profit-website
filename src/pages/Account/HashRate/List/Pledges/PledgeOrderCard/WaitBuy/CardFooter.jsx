import { Statistic } from 'ant-design-vue';
import SharedFilled from 'ahoney/lib/icons/SharedFilled';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import PledgeStatusTag from '../components/PledgeStatusTag';
import styles from './index.less?module';

const CardFooter = {
  props: ['data'],
  data() {
    return {
      showShareQrCodeModal: false,
    };
  },
  methods: {
    getButtonDataSource() {
      return [
        {
          label: this.$t('transferShare'),
          icon: <SharedFilled />,
          onClick: () => {
            this.showShareQrCodeModal = true;
          },
        },
      ];
    },
  },

  render() {
    const { data } = this;
    const link = `${process.env.MOBILE_SITE_HOST}/shareItem/pledges/${data.id}?locale=${getLocalLanguage()}`;
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
      <div>
        <FooterLayout
          scopedSlots={{
            topExtra: () => topExtra,
            leftContent: () => <PledgeStatusTag status={data.status} />,
            rightContent: () => <FooterButtonGroup dataSource={this.getButtonDataSource(data.id)} />,
          }}
        />
        <ShareQrCodeModal
          value={this.showShareQrCodeModal}
          onClose={() => {
            this.showShareQrCodeModal = false;
            this.$emit('refresh');
          }}
          title={this.$t('myHashratePledgeShare')}
          content={link}
        />
      </div>
    );
  },
};

export default CardFooter;
