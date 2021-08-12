import CheckCircleOFilled from 'ahoney/lib/icons/CheckCircleOFilled';
import downloadPhone from '@/assets/home/download-phone.png';
import enDownloadPhone from '@/assets/home/en-download-phone.png';
import QRCodeModule from '@/shared/components/QRCodeModule';
import appleImage from '@/assets/home/apple.png';
import androidImage from '@/assets/download/android.png';
import { getIsEnglish, getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const Download = {
  props: {
    versionInfo: Object,
  },
  computed: {
    downloadPhone() {
      return getIsEnglish() ? enDownloadPhone : downloadPhone;
    },
  },
  methods: {
    getEffectList() {
      return [
        {
          text: this.$t('transactionHashrate'),
        },
        {
          text: this.$t('understandInformation'),
        },
        {
          text: this.$t('gainProfit'),
        },
      ];
    },
    getDownloadAddress() {
      return `${process.env.MOBILE_SITE_HOST}/download/pre-dispatch?locale=${getLocalLanguage()}`;
    },
    getVersionList() {
      const { android, iOS } = this.versionInfo;
      return [
        {
          imgSrc: appleImage,
          version: iOS.version,
        },
        {
          imgSrc: androidImage,
          version: android.version,
        },
      ];
    },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <div>
          <div class={styles.circle}>
            <img class={styles['download-phone']} src={this.downloadPhone} alt="" />
          </div>
        </div>
        <div>
          <div class={styles['download-title']}>{this.$t('downloadApp')}</div>
          <div class={styles['download-sub-title']}>{this.$t('downloadAppSubTitle')}</div>
          <div class={styles['effect-box']}>
            {this.getEffectList().map(({ text }) => (
              <div class={styles['effect-item']}>
                <CheckCircleOFilled />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div class={styles['download-enter-box']}>
            <QRCodeModule
              className={styles['qr-code']}
              value={this.getDownloadAddress()}
              options={{ width: 130 }}
            />
            <div class={styles['version-box']}>
              {this.getVersionList().map(({ imgSrc, version }) => (
                <div class={styles['version-item']}>
                  <img src={imgSrc} alt="" />
                  <span>{`${this.$t('appVersion')}${version}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default Download;
