import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import './index.less';

const ErrorAlert = {
  props: {
    value: String,
  },

  render() {
    return (
      <div class="error-alert">
        <div><InfoCircleFilled /></div>
        <div>{this.value}</div>
      </div>
    );
  },
};

export default ErrorAlert;
