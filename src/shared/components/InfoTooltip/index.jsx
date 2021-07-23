import { Tooltip } from 'ant-design-vue';
import classNames from 'classnames';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import './index.less';

const ToolTipWrap = {
  inheritAttrs: false,
  props: {
    className: String,
    title: String,
    content: String,
  },

  render() {
    return (
      <div class={classNames('info-tooltip-wrap', this.className)}>
        <Tooltip
          overlayClassName='info-tooltip'
          placement='right'
          scopedSlots={{
            title: () => (
              <div>
                <div class='info-title'>{this.title}</div>
                <div class='info-content'>{this.content}</div>
              </div>
            ),
          }}
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
