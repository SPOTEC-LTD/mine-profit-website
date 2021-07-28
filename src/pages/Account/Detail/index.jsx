import BaseContainer from '@/shared/components/BaseContainer';
import { getUserBadge, getInviteInfo, getUserBaseInfo } from '@/api/account/userInfo';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { getWalletAssets } from '@/api/account/wallet';
import getOrderBalance from '@/shared/utils/getOrderBalance';
import BaseInfo from './BaseInfo';
import Authentication from './Authentication';
import Wallet from './Wallet';
import Hashrate from './Hashrate';
import Investment from './Investment';
import styles from './index.less?module';

const Detail = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);
    const props = {
      userInfo: {},
      badge: {},
      inviteInfo: {},
      userBalance: {
        totalUsdt: 0,
        totalCny: 0,
        balanceList: [],
      },
    };

    const getWalletDetailPromise = getWalletAssets({}, { ctx });
    const getUserBadgePromise = getUserBadge({}, { ctx });
    const fetchInviteInfo = getInviteInfo({ pathParams: { userId } }, { ctx });
    const fetchUserBaseInfo = getUserBaseInfo({ pathParams: { userId } }, { ctx });

    try {
      const data = await getUserBadgePromise;
      const { body: { badge } } = data;
      props.badge = badge;
    } catch (error) {
      console.log('error', error);
    }

    try {
      const { body: { userInviteInfo } } = await fetchInviteInfo;
      props.inviteInfo = userInviteInfo;
    } catch (error) {
      console.log('error', error);
    }

    try {
      const { body: { userInfo } } = await fetchUserBaseInfo;
      props.userInfo = userInfo;
    } catch (error) {
      console.log('error', error);
    }

    try {
      const { body: { userBalance } } = await getWalletDetailPromise;
      props.userBalance = { ...userBalance, balanceList: getOrderBalance(userBalance.balanceList) };
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },
  render() {
    return (
      <div>
        <BaseInfo info={this.badge} userInfo={this.userInfo} inviteInfo={this.inviteInfo} />
        <BaseContainer class={styles['account-other-info']}>
          <Authentication userInfo={this.userInfo} />
          <Wallet userBalance={this.userBalance} />
          <Hashrate />
          <Investment />
        </BaseContainer>
      </div>
    );
  },
};

export default Detail;
