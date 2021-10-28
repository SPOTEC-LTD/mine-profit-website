import classNames from 'classnames';
import appleImage from '@/assets/home/apple.png';
import androidImage from '@/assets/download/android.png';
import QRCodeModule from '@/shared/components/QRCodeModule';
import purchaceVideo from '@/assets/home/purchaceVideo.mp4';
import enPurchaceVideo from '@/assets/home/enPurchaceVideo.mp4';
import downloadLogoImg from '@/assets/home/download-logo.png';
import halfCircleImg from '@/assets/home/half-circle.png';
import circleImg from '@/assets/home/circle-img.png';
import squareImg from '@/assets/home/square-img.png';
import triangleImg from '@/assets/home/triangle-img.png';
import dotTriangleIconImg from '@/assets/home/dot-triangle-icon.png';
import cloudManagementVideo from '@/assets/home/cloudManagementVideo.mp4';
import enCloudManagementVideo from '@/assets/home/enCloudManagementVideo.mp4';
import miningProfitVideo from '@/assets/home/miningProfitVideo.mp4';
import enMiningProfitVideo from '@/assets/home/enMiningProfitVideo.mp4';
import withdrawFreelyVideo from '@/assets/home/withdrawFreelyVideo.mp4';
import enWithdrawFreelyVideo from '@/assets/home/enWithdrawFreelyVideo.mp4';
import DownLoadItem from '@/pages/home/component/DownLoadItem';
import { getIsEnglish, getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const Download = {
  props: {
    versionInfo: Object,
    downloadRef: Object,
  },

  data() {
    return {
      isContentFixed: false,
      isAbsoluteAuto: false,
      activeIndex: 0,
      downloadTop: 3500,
      rotateDeg: 275,
      translateY: 27,
      scrollGroupe: [
        {
          video: getIsEnglish() ? enPurchaceVideo : purchaceVideo,
          title: this.$t('purchaseCloudHashRate'),
          dec: this.$t('freeTradingByOfficialMarket'),
          backgroundIMG: halfCircleImg,
          className: 'half-circle-wrapper',
        },
        {
          video: getIsEnglish() ? enCloudManagementVideo : cloudManagementVideo,
          title: this.$t('MineprofitCloudManagement', { enProductName: this.$t('enProductName') }),
          dec: this.$t('autoDeployWithoutSet'),
          backgroundIMG: triangleImg,
          className: 'triangle-wrapper',
        },
        {
          video: getIsEnglish() ? enMiningProfitVideo : miningProfitVideo,
          title: this.$t('profitOfMining'),
          dec: this.$t('autoClearToWallet'),
          backgroundIMG: squareImg,
          className: 'square-wrapper',
        },
        {
          video: getIsEnglish() ? enWithdrawFreelyVideo : withdrawFreelyVideo,
          title: this.$t('withdrawFreely'),
          dec: this.$t('withdrawFreelyByBlockChain'),
          backgroundIMG: circleImg,
          className: 'circle-wrapper',
        },
      ],
    };
  },

  mounted() {
    window.addEventListener('scroll', this.onHandleScroll, false);
  },

  destroyed() {
    window.removeEventListener('scroll', this.onHandleScroll);
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
      const { top, height } = this.$refs.downLoadRef.getBoundingClientRect();
      // 求download组件在页面上的位置, 允许误差20
      if (top >= clientHeights - 10 && top <= clientHeights + 10) {
        this.downloadTop = scrollTop + clientHeights;
      }
      const halfScreen = clientHeights / 2;
      const downloadLastVideo = this.downloadTop + height - clientHeights;
      // 执行里面转圈动画
      if (scrollTop > (this.downloadTop - halfScreen) && scrollTop < (downloadLastVideo + halfScreen)) {
        this.translateY = -(scrollTop - (this.downloadTop + clientHeights)) / 50;
        this.rotateDeg = this.translateY * 10;
      }
      // 执行文字翻转
      if (scrollTop > this.downloadTop && scrollTop < downloadLastVideo) {
        const length = scrollTop - (this.downloadTop - halfScreen); // 半屏幕的时候刷新下一个
        this.activeIndex = Math.floor(length / clientHeights);
        this.isContentFixed = true;
      } else if (scrollTop > downloadLastVideo) {
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
          <div class={styles['download-title']}>
            <img src={downloadLogoImg} alt="" class={styles['download-logo']}/>
            <span>{this.$t('downloadApp', { enProductName: this.$t('enProductName') })}</span>
          </div>
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
                  <span>{`${this.$t('appVersion')}${version || '-'}`}</span>
                </div>
              ))}
            </div>
          </div>
          <img
            src={dotTriangleIconImg}
            alt=""
            class={styles['dot-triangle-icon']}
            style={`bottom: ${(this.translateY) * 10}px`}
          />
        </div>

        <div class={styles['video-group']} ref='downLoadRef'>
          {this.scrollGroupe.map((item, index) => (
            <DownLoadItem
              dataSource={item}
              rotateDeg={this.rotateDeg}
              translateY={this.translateY}
              key={index}
              videoIndex={index}
            />
          ))}
        </div>

      </div>
    );
  },
};

export default Download;
