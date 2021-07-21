import { Progress } from 'ant-design-vue';
import './index.less';

const LineProgress = {
  props: {
    name: { type: String },
    number: { type: String },
    percentage: { type: Number },
  },

  render() {
    return (
      <div class='line-progress-wrapper'>
        <div class='line-progress-info'>
          <span>{this.name}</span>
          <span>{this.number}</span>
        </div>
        <Progress
          percent={this.percentage}
          show-info={false}
          strokeColor="#5C6673"
        />
      </div>
    );
  },
};

export default LineProgress;
