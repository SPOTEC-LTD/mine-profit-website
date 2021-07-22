import CheckCircleOutlined from 'ahoney/lib/icons/CheckCircleOutlined';
import './index.less';

const SuccessNode = {
  props: {
    value: [String, Number, Object],
  },
  render() {
    return (
      <div class="notification-success">
        <div><CheckCircleOutlined /></div>
        <div class="notification-success-value">{this.value}</div>
      </div>
    );
  },
};

export default SuccessNode;
