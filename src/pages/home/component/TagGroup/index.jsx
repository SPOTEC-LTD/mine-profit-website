import classNames from 'classnames';
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

  render() {
    const { tags } = this.productData;
    const isNewUser = tags.includes(NEW_USER_USED);
    const isNewBuy = tags.includes(MARKET_NEW_BUY_BUFF);
    const isRenewBuy = tags.includes(MARKET_RENEW_BUFF);

    return (
      <div class={classNames('tag-groups', this.className)}>
        {isNewUser && <NewUserButton class='group-tag' />}
        {isNewBuy && <NewBuyBuffButton class='group-tag'>{this.$t('marketNewBuyBuff')}</NewBuyBuffButton>}
        {isRenewBuy && <NewBuyBuffButton class='group-tag'>{this.$t('marketRenewBuff')}</NewBuyBuffButton>}
      </div>
    );
  },
};

export default TagGroup;
