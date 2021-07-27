import { Tooltip } from 'ant-design-vue';
import './index.less';

const InfoTooltip = {
  inheritAttrs: false,
  props: {
    title: String,
    content: String,
  },

  render() {
    return (
      <Tooltip
        overlayClassName='info-tooltip'
        placement='right'
        scopedSlots={{
          title: () => (
            <div>
              {this.title && <div class='info-title'>{this.title}</div>}
              <div class='info-content'>{this.content}</div>
            </div>
          ),
        }}
        {...{
          on: this.$listeners,
          props: this.$attrs,
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </Tooltip>
    );
  },
};

export default InfoTooltip;
