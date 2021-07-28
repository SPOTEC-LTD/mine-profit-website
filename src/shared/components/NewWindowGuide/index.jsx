import classNames from 'classnames';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';

import './index.less';

const NewWindowGuide = {
  props: {
    className: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    hideIcon: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    return (
      <div
        class={classNames('guide-box', this.className)}
        onClick={() => { this.$emit('guide'); }}
      >
        {this.label && <span>{this.label}</span>}
        {!this.hideIcon && <RightOutlined />}
      </div>
    );
  },
};

export default NewWindowGuide;
