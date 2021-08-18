import { Progress } from 'ant-design-vue';
import './index.less';

const RestMount = {
  props: {
    className: String,
    restPercentage: [String, Number],
    total: [String, Number],
    rest: [String, Number],
  },

  methods: {
    getFormatNode() {
      return (
        <div class='circle-progress-format'>
          {`${this.restPercentage}`}
          <span class='percentage-percent-sign'>%</span>
        </div>
      );
    },
  },

  render() {
    return (
      <div class={['rest-mount-wrapper', this.className]}>
        <div class='rest-mount-progress'>
          <Progress
            percent={this.restPercentage}
            type='circle'
            strokeColor="#FFFFFF"
            width={68}
            strokeWidth={7}
            format={this.getFormatNode}
          />
        </div>
        <div class='rest-mount-data-details'>
          <div>{this.$t('marketRemainHashrate')}</div>
          <div class='rest-mount-count'>{this.rest}</div>
          <div>{`/${this.total}`}</div>
        </div>
      </div>
    );
  },
};

export default RestMount;
