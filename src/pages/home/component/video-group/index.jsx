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
              autoplay
              muted
              ontimeupdate={event => this.$emit('onTimeupdate', event, index)}
            />
          ))
        }
      </div>
    );
  },
};

export default VideoGroup;
