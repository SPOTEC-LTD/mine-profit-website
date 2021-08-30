import classNames from 'classnames';
import throttle from 'lodash/throttle';
import appleImage from '@/assets/home/apple.png';
import androidImage from '@/assets/download/android.png';
import QRCodeModule from '@/shared/components/QRCodeModule';
import downloadPhone from '@/assets/home/download-phone.png';
import enDownloadPhone from '@/assets/home/en-download-phone.png';
import purchaceVideo from '@/assets/home/purchaceVideo.mp4';
import cloudManagementVideo from '@/assets/home/cloudManagementVideo.mp4';
import miningProfitVideo from '@/assets/home/miningProfitVideo.mp4';
import withdrawFreelyVideo from '@/assets/home/withdrawFreelyVideo.mp4';
import DownLoadItem from '@/pages/home/component/DownLoadItem';
import { getIsEnglish, getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const Download = {
  props: {
    versionInfo: Object,
  },

  data() {
    return {
      isContentFixed: false,
      isAbsoluteAuto: false,
      activeIndex: 0,
      scrollGroupe: [
        {
          video: purchaceVideo,
          title: this.$t('purchaseCloudHashRate'),
          dec: this.$t('freeTradingByOfficialMarket'),
        },
        {
          video: cloudManagementVideo,
          title: this.$t('MineprofitCloudManagement'),
          dec: this.$t('autoDeployWithoutSet'),
        },
        {
          video: miningProfitVideo,
          title: this.$t('profitOfMining'),
          dec: this.$t('autoClearToWallet'),
        },
        {
          video: withdrawFreelyVideo,
          title: this.$t('withdrawFreely'),
          dec: this.$t('withdrawFreelyByBlockChain'),
        },
      ],
    };
  },

  computed: {
    downloadPhone() {
      return getIsEnglish() ? enDownloadPhone : downloadPhone;
    },
  },

  created() {
    this.scrollThrottle = throttle(this.onHandleScroll, 100);
  },

  mounted() {
    window.addEventListener('scroll', this.scrollThrottle, false);
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrollThrottle);
  },

  methods: {
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

    onHandleScroll() {
      const clientHeights = document.body.clientHeight;
      const { scrollTop } = document.documentElement;
      const length = scrollTop - 3100;
      this.activeIndex = Math.floor(length / clientHeights);
      if (scrollTop > 3600 && scrollTop < 6178) {
        this.isContentFixed = true;
      } else if (scrollTop > 6178) {
        this.isAbsoluteAuto = true;
        this.isContentFixed = false;
      } else {
        this.isContentFixed = false;
        this.isAbsoluteAuto = false;
      }
    },
    getDescriptionNode(data, index) {
      return (
        <div class={classNames(styles['effect-box'], { [styles['active-index']]: this.activeIndex === index })}>
          <div class={styles['effect-item']}>{data.title}</div>
          <div>{data.dec}</div>
        </div>
      );
    },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <div
          class={
            classNames(
              styles['download-description'],
              {
                [styles['fixed-description']]: this.isContentFixed,
                [styles['absolute-auto-description']]: this.isAbsoluteAuto,
              },
            )}
        >
          <div class={styles['download-title']}>{this.$t('downloadApp')}</div>
          <div class={styles['download-sub-title']}>{this.$t('downloadAppSubTitle')}</div>
          <div class={styles['effect-box']}>
            {this.scrollGroupe.map((item, index) => (
              <div
                class={classNames(
                  styles['groupe-item'], { [styles['active-index']]: this.activeIndex === index },
                )}
              >
                <div class={styles['effect-item']}>{item.title}</div>
                <div>{item.dec}</div>
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

        <div class={styles['video-group']}>
          {this.scrollGroupe.map(item => (
            <DownLoadItem videoSource={item.video} />
          ))}
        </div>

      </div>
    );
  },
};

export default Download;
