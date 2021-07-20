import './index.less';

const WidgetTitle = {
  render() {
    const rightContent = this.$scopedSlots.rightContent && this.$scopedSlots.rightContent();

    return (
      <div class="account-widget-title">
        {this.$slots.default}
        {
          rightContent && (
            <div class="account-widget-right-content">
              {rightContent}
            </div>
          )
        }
      </div>
    );
  },
};

export default WidgetTitle;
