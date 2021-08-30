import classNames from 'classnames';
import downloadPhone from '@/assets/home/download-phone.png';
import enDownloadPhone from '@/assets/home/en-download-phone.png';
import singlePhone from '@/assets/home/single-phone.png';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const DownLoadItem = {
  props: {
    videoSource: String,
  },

  computed: {
    downloadPhone() {
      return getIsEnglish() ? enDownloadPhone : downloadPhone;
    },
  },

  render() {
    return (
      <div class={styles['video-item']}>
        <div class={styles.circle}>
          <img class={styles['download-phone']} src={singlePhone} alt="" />
          <video
            class={classNames(styles['purchase-video'])}
            src={this.videoSource}
            preload
            muted
            autoPlay
          />
        </div>
      </div>
    );
  },
};

export default DownLoadItem;
