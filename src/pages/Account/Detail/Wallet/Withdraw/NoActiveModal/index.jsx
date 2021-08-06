import { Button } from 'ant-design-vue';
import { officialMarketingPath } from '@/router/consts/urls';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import BaseModal from '@/shared/components/BaseModal';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import fangFaYiImg from '@/assets/wallet/fangfayi-image.png';
import fangFaErImg from '@/assets/wallet/fangfaer-image.png';
import locationServices from '@/shared/services/location/locationServices';

import styles from './index.less?module';

const NoActiveModal = {
  props: {
    value: Boolean,
    userId: [String, Number],
  },

  data() {
    return {
      showShareQrCodeModal: false,
    };
  },

  methods: {
    getActiveWaysNode() {
      const activeMethodsList = [
        {
          title: this.$t('activeWithDrawMethodOne'),
          describe: this.$t('activeWithDrawMethodOneTip'),
          image: fangFaYiImg,
          className: 'buy-hashrate',
          btnText: this.$t('walletAllTypesBuyHashrate'),
          onClick: () => {
            this.$emit('closeNoActive');
            locationServices.push(officialMarketingPath);
          },
        },
        {
          title: this.$t('activeWithDrawMethodTwo'),
          describe: this.$t('activeWithDrawMethodTwoTip'),
          image: fangFaErImg,
          className: 'invest-friend',
          btnText: this.$t('drawerInviteFriend'),
          onClick: () => {
            this.$emit('closeNoActive');
            this.showShareQrCodeModal = true;
          },
        },
      ];
      return (
        <div class={styles['active-ways']}>
          {activeMethodsList.map(({ title, describe, image, className, btnText, onClick }, index) => (
            <div class={styles.way}>
              <div key={index} class={styles['way-outer']}>
                <div class={styles['way-inner']}>
                  <div class={styles['way-content']}>
                    <i />
                    <div>
                      <div class={styles['way-title']}>{title}</div>
                      <div class={styles['way-describe']}>{describe}</div>
                    </div>
                  </div>
                  <img src={image} alt={title} class={styles[className]} />
                </div>
              </div>
              <Button
                class={styles['way-btn']}
                type='primary'
                onClick={onClick}
              >
                {btnText}
              </Button>
            </div>
          ))}
        </div>
      );
    },
  },

  render() {
    const link = `${process.env.MOBILE_SITE_HOST}/register/${this.userId}?locale=${getLocalLanguage()}`;

    return (
      <div>
        <BaseModal
          value={this.value}
          title={this.$t('activeWithDrawTitle')}
          width={658}
          onCancel={() => { this.$emit('closeNoActive'); }}
          scopedSlots={{
            content: this.getActiveWaysNode,
          }}
        />

        <ShareQrCodeModal
          value={this.showShareQrCodeModal}
          onClose={() => { this.showShareQrCodeModal = false; }}
          title={this.$t('myInvitationQRCode')}
          content={link}
        />
      </div>
    );
  },

};

export default NoActiveModal;
