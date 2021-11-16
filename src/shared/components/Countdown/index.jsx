import { formatCountdown } from 'aa-utils/lib/formatCountdown';
import './index.less';

const Countdown = {
  props: {
    deadline: Number,
    prefix: { type: String, default: '' },
    className: String,
    inPledgePage: { type: Boolean, default: false },
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
        if (this.count === -1000) {
          clearInterval(this.timer);
          this.$emit('finish');
        }
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

    const onlyMSFormat = this.$t('remainTimeMS', {
      minute: mm,
      second: ss,
    });

    return (
      <div class={['countdown-timer-wrapper', this.className]}>
        {`${this.prefix} ${this.inPledgePage ? onlyMSFormat : timeFormat}`}
      </div>
    );
  },
};

export default Countdown;
