import { Tooltip } from 'ant-design-vue';
import classNames from 'classnames';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import './index.less';

const ToolTipWrap = {
  inheritAttrs: false,
  props: {
    className: String,
  },

  render() {
    return (
      <div class={classNames('tool_tip_wrap', this.className)}>
        <Tooltip
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placement='right'
          {...{
            on: this.$listeners,
            props: this.$attrs,
          }}
        >
          <InfoCircleFilled />
        </Tooltip>
      </div>
    );
  },
};

export default ToolTipWrap;
