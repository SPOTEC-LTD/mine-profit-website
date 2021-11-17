import { mapActions, mapState } from 'vuex';
import SharedFilled from 'ahoney/lib/icons/SharedFilled';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import ConfirmModal from '@/shared/components/ConfirmModal';
import { PLEDGE_PAGE } from '@/shared/consts/countdownFormatType';
import { CANCEL_HASHRATE_PLEDGE, HASH_RATE } from '@/modules/account/hashRate';
import Countdown from '@/shared/components/Countdown';
import PledgeStatusTag from '../components/PledgeStatusTag';
import styles from './index.less?module';

const CardFooter = {
  props: ['data'],
  data() {
    return {
      showShareQrCodeModal: false,
      isVisibleModal: false,
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects[`${HASH_RATE}/${CANCEL_HASHRATE_PLEDGE}`],
    }),
  },
  methods: {
    ...mapActions(HASH_RATE, [CANCEL_HASHRATE_PLEDGE]),
    cancelPledge(id) {
      this[CANCEL_HASHRATE_PLEDGE]({ id }).then(() => {
        this.isVisibleModal = false;
        this.$emit('refresh');
      });
    },
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

    const topExtra = (
      <div class={styles['count-down-box']}>
        <span>{this.$t('pledgeAutoCancelTips')}</span>
        <Countdown
          className={styles['count-down']}
          deadline={1000 * data.remainTime}
          formatType={PLEDGE_PAGE}
          onFinish={() => this.$emit('refresh')}
        />
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
        <ConfirmModal
            value={this.isVisibleModal}
            confirmLoading={this.loading}
            title={this.$t('cancelPledge')}
            onConfirm={() => this.cancelPledge(data.id)}
            onCancel={() => { this.isVisibleModal = false; }}
          >
            <div class={styles['cannel-modal']}>
              <InfoCircleFilled />
              <div>{this.$t('pledgeCancelTips')}</div>
            </div>
          </ConfirmModal>
      </div>
    );
  },
};

export default CardFooter;
