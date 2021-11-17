import { formatCountdown } from 'aa-utils/lib/formatCountdown';
import { DEFAULT, PLEDGE_PAGE, REAL_NAME_DIALOG } from '@/shared/consts/countdownFormatType';
import './index.less';

const Countdown = {
  props: {
    deadline: Number,
    prefix: { type: String, default: '' },
    className: String,
    formatType: Number,
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

    getResultFormat(type) {
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

      const countdownFormat = this.$t('countdownFormat', {
        second: ss,
      });

      const formatMap = {
        [DEFAULT]: timeFormat,
        [PLEDGE_PAGE]: onlyMSFormat,
        [REAL_NAME_DIALOG]: countdownFormat,
      };

      return formatMap[type];
    },
  },

  render() {
    return (
      <div class={['countdown-timer-wrapper', this.className]}>
        {`${this.prefix} ${this.getResultFormat(this.formatType || DEFAULT)}`}
      </div>
    );
  },
};

export default Countdown;
