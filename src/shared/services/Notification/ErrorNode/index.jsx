import Vue from 'vue';
import CloseCircleOutlined from 'ahoney/lib/icons/CloseCircleOutlined'
import './index.less';

const ErrorNode = {
  props: {
    value: [String, Number, Object],
  },
  render() {
    return (
      <div class="notification-error">
        <div><CloseCircleOutlined/></div>
        <div class="notification-error-value">{this.value}</div>
      </div>
    );
  },
};

export default ErrorNode;
