import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import './index.less';

const ErrorAlert = {
  props: {
    value: String,
    className: String,
  },

  render() {
    return (
      <div class={['error-alert', this.className]}>
        <InfoCircleFilled />
        <div>{this.value}</div>
      </div>
    );
  },
};

export default ErrorAlert;
