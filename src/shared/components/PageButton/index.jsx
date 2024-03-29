import { Button } from 'ant-design-vue';
import BaseContainer from '@/shared/components/BaseContainer';
import './index.less';

const PageButton = {
  props: {
    isCustomizeBtn: {
      type: Boolean,
      default: false,
    },
  },

  render() {
    return (
      <div class="page-button-wrap">
        <BaseContainer hasBreadcrumb={false}>
          <div class="page-button-content">
            <div>{this.$scopedSlots.leftContent && this.$scopedSlots.leftContent()}</div>
            <div class="content-right">
              <div>{this.$scopedSlots.rightContent && this.$scopedSlots.rightContent()}</div>
              {this.isCustomizeBtn
                ? this.$scopedSlots.default()
                : <Button
                    {...{ on: this.$listeners, props: this.$attrs }}
                    class="page-button"
                  >
                    {this.$scopedSlots.default()}
                  </Button>
              }
            </div>
          </div>
        </BaseContainer>
      </div>
    );
  },
};

export default PageButton;
