import { Tooltip } from 'ant-design-vue';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import './index.less';

const CellTitle = {
  props: {
    title: {
      type: String,
      default: '',
    },
    showMention: {
      type: Boolean,
      default: false,
    },
    notificationContent: {
      type: String,
      default: '',
    },
  },

  render() {
    const content = (
      <div class='notification-content'>
        <div class='notification-slogan'>
          <div class='notification-title'>{this.title}</div>
          <div class='notification-main-content'>{this.notificationContent}</div>
        </div>
      </div>
    );

    return (
      <div class="title-container">
        <span class="cell-pre-title">{this.title}</span>
        {
          this.showMention && (
            <Tooltip
              placement="right"
              scopedSlots={{
                title: () => content,
              }}
            >
               <InfoCircleFilled />
            </Tooltip>
          )
        }

      </div>
    );
  },
};

export default CellTitle;
