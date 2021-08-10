import CloseOutlined from 'ahoney/lib/icons/CloseOutlined';
import './index.less';

const PowerOffButton = {
  props: {},

  render() {
    return (
      <div class='power-off'>
        <div>{this.$t('powerOff')}</div>
        <div class='cancel-icon'><CloseOutlined/></div>
      </div>
    );
  },
};

export default PowerOffButton;
