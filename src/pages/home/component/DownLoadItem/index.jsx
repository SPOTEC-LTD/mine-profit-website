import classNames from 'classnames';
import singlePhone from '@/assets/home/single-phone.png';
import lineCircleImg from '@/assets/home/line-circle.png';
import dotCircleImg from '@/assets/home/dot-circle.png';
import styles from './index.less?module';

const DownLoadItem = {
  props: {
    dataSource: {
      type: Object,
      default: () => {},
    },
    rotateDeg: Number,
    translateY: Number,
  },

  computed: {
    picTransform() {
      const { rotateDeg, translateY } = this;
      return `transform:translateY(${`${translateY * 2}%`}) rotateZ(${rotateDeg}deg)`;
    },
  },

  render() {
    const { video, backgroundIMG, className } = this.dataSource;

    return (
      <div class={classNames(styles['video-item'], styles[className])}>
        <div class={styles.circle}>
          <img src={lineCircleImg} alt="" class={styles['line-circle']}/>
          <img src={dotCircleImg} alt="" class={styles['dot-circle']}/>
          <img
            src={backgroundIMG}
            alt=""
            class={styles['download-background']}
            style={this.picTransform}
          />
          <img class={styles['download-phone']} src={singlePhone} alt="" />
          <video class={styles['purchase-video']} src={video} preload muted autoPlay loop />
        </div>
      </div>
    );
  },
};

export default DownLoadItem;
