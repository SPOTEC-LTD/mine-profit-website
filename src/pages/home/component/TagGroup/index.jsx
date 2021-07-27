import classNames from 'classnames';
import { Popover } from 'ant-design-vue';
import NewBuyBuffButton from '@/shared/components/NewBuyBuffButton';
import NewUserButton from '@/shared/components/NewUserButton';
import { NEW_USER_USED, MARKET_NEW_BUY_BUFF, MARKET_RENEW_BUFF } from '@/shared/consts/productTag';
import './index.less';

const TagGroup = {
  props: {
    className: String,
    productData: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    mentionTips(options = {}) {
      const { content, trigger } = options;
      return (
        <Popover overlayClassName='mention-tips' placement='right' scopedSlots={{ content: () => content() }}>
          {trigger && trigger()}
        </Popover>
      );
    },

    // TODO FIX TAGS MENTION
    newUserMentionNode() {
      return (
        <div>提示内容</div>
      );
    },
  },

  render() {
    const { tags } = this.productData;
    const isNewUser = tags.includes(NEW_USER_USED);
    const isNewBuy = tags.includes(MARKET_NEW_BUY_BUFF);
    const isRenewBuy = tags.includes(MARKET_RENEW_BUFF);

    return (
      <div class={classNames('tag-groups', this.className)}>
        {isNewUser && (
          this.mentionTips({
            content: this.newUserMentionNode,
            trigger: () => <NewUserButton class='group-tag' />,
          })
        )}
        {isNewBuy && (
          this.mentionTips({
            content: this.newUserMentionNode,
            trigger: () => <NewBuyBuffButton class='group-tag'>{this.$t('marketNewBuyBuff')}</NewBuyBuffButton>,
          })
        )}
        {isRenewBuy && (
          this.mentionTips({
            content: this.newUserMentionNode,
            trigger: () => <NewBuyBuffButton class='group-tag'>{this.$t('marketRenewBuff')}</NewBuyBuffButton>,
          })
        )}
      </div>
    );
  },
};

export default TagGroup;
