import BaseContainer from '@/shared/components/BaseContainer';
import { getUserBadge, getInviteInfo, getUserBaseInfo } from '@/api/account/userInfo';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
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
    };

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

    return props;
  },
  render() {
    return (
      <div>
        <BaseInfo info={this.badge} inviteInfo={this.inviteInfo}/>
        <BaseContainer class={styles['account-other-info']}>
          <Authentication userInfo={this.userInfo} />
          <Wallet />
          <Hashrate />
          <Investment />
        </BaseContainer>
      </div>
    );
  },
};

export default Detail;
