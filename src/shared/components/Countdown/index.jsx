import { formatCountdown } from 'aa-utils/lib/formatCountdown';
import './index.less';

const Countdown = {
  props: {
    deadline: Number,
    prefix: String,
  },

  data() {
    return {
      count: this.deadline,
      timeArray: formatCountdown(this.deadline, 'DD HH mm ss').split(' '),
    };
  },

  mounted() {
    if (this.deadline) {
      this.initTimer();
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  watch: {
    deadline() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.initTimer();
    },
  },

  methods: {
    initTimer() {
      this.count = this.deadline;
      this.timer = setInterval(() => {
        this.timeArray = formatCountdown(this.count, 'DD HH mm ss').split(' ');
        this.count -= 1000;
      }, 1000);
    },
  },

  render() {
    const [DD, HH, mm, ss] = this.timeArray;
    const timeFormat = this.$t('timeFormat', {
      day: DD,
      hour: HH,
      minute: mm,
      second: ss,
    });

    return (
      <div class="countdown-timer-wrapper">{`${this.prefix} ${timeFormat}`}</div>
    );
  },
};

export default Countdown;
