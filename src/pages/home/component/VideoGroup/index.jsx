import './index.less';
import classNames from 'classnames';
import phoneBackground from '@/assets/home/phone.png';

const VideoGroup = {
  props: ['videoGroupe', 'activeIndex'],

  render() {
    return (
      <div class='video-container'>
        <img src={phoneBackground} alt="" class="phone-background" />
        {
          this.videoGroupe.map((data, index) => (
            <video
              class={classNames('purchase-video', { 'active-video': this.activeIndex === index })}
              src={data}
              preload
              muted
              onended={() => this.$emit('onEnded')}
            />
          ))
        }
      </div>
    );
  },
};

export default VideoGroup;
