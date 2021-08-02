import * as rankAPI from '@/api/rank';
import incomeTab from '@/assets/rank/income-tab.png';
import angelTab from '@/assets/rank/angel-tab.png';
import buyerTab from '@/assets/rank/buyer-tab.png';
import enIncomeTab from '@/assets/rank/en-income-tab.png';
import enAngelTab from '@/assets/rank/en-angel-tab.png';
import enBuyerTab from '@/assets/rank/en-buyer-tab.png';
import incomeIcon from '@/assets/rank/income-rank-icon.png';
import enIncomeIcon from '@/assets/rank/en-income-rank-icon.png';
import incomeLeftIcon from '@/assets/rank/income-left-icon.png';
import incomeRightIcon from '@/assets/rank/income-right-icon.png';
import angelRankIcon from '@/assets/rank/angel-rank-icon.png';
import enAngelRankIcon from '@/assets/rank/en-angel-rank-icon.png';
import angelLeftIcon from '@/assets/rank/angel-left-icon.png';
import angelRightIcon from '@/assets/rank/angel-right-icon.png';
import newPurchaseRankIcon from '@/assets/rank/new-purchase-rank-icon.png';
import enNewPurchaseRankIcon from '@/assets/rank/en-new-purchase-rank-icon.png';
import newPurchaseLeftIcon from '@/assets/rank/new-purchase-left-icon.png';
import newPurchaseRightIcon from '@/assets/rank/new-purchase-right-icon.png';
import topNameBg from '@/assets/rank/top-name-bg.png';
import BaseContainer from '@/shared/components/BaseContainer';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import KeepTabs from '@/shared/components/KeepTabs';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { INCOME, ANGEL, BUYER } from '@/pages/Rank/consts/rankType';
import Leaderboard from './Leaderboard';
import styles from './index.less?module';

const { TabPane } = KeepTabs;

const Rank = {
  async asyncData(ctx) {
    const { userId = null } = getUserInfoFunc(ctx);
    const props = {
      totalIncomeRankInfo: {},
      newBuyRankInfo: {},
      angelRankInfo: {},
      defaultSelectValue: ctx.query.activeName,
    };
    const getTotalIncomeRankInfo = rankAPI.getLeaderboardInfo({ pathParams: { topType: 1 }, data: { userId } }, { ctx });
    const getAngelRankInfo = rankAPI.getLeaderboardInfo({ pathParams: { topType: 2 }, data: { userId } }, { ctx });
    const getNewBuyRankInfo = rankAPI.getLeaderboardInfo({ pathParams: { topType: 3 }, data: { userId } }, { ctx });

    try {
      const { body: { topHashrate } } = await getTotalIncomeRankInfo;
      props.totalIncomeRankInfo = topHashrate;
    } catch (error) {
      console.log('error', error);
    }

    try {
      const { body: { topHashrate } } = await getNewBuyRankInfo;
      props.newBuyRankInfo = topHashrate;
    } catch (error) {
      console.log('error', error);
    }

    try {
      const { body: { topHashrate } } = await getAngelRankInfo;
      props.angelRankInfo = topHashrate;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },
  data() {
    return {
      isEnglish: getIsEnglish(),
    };
  },
  computed: {
    incomeTab() {
      return this.isEnglish ? enIncomeTab : incomeTab;
    },
    angelTab() {
      return this.isEnglish ? enAngelTab : angelTab;
    },
    buyerTab() {
      return this.isEnglish ? enBuyerTab : buyerTab;
    },
    isTotalIncomeRank() {
      const { rankType = INCOME } = this.$route.query;
      return rankType === INCOME;
    },
    isAngelRank() {
      return this.$route.query.rankType === ANGEL;
    },
    isNewBuyRank() {
      return this.$route.query.rankType === BUYER;
    },
    incomeIcon() {
      return this.isEnglish ? enIncomeIcon : incomeIcon;
    },
    angelRankIcon() {
      return this.isEnglish ? enAngelRankIcon : angelRankIcon;
    },
    newPurchaseRankIcon() {
      return this.isEnglish ? enNewPurchaseRankIcon : newPurchaseRankIcon;
    },
  },
  render() {
    return (
      <div>
        <BaseContainer class={styles['rank-top-bg']} contentClassName={styles['rank-top-content']}>
          <transition name="rank-icon" mode="out-in">
            {this.isTotalIncomeRank && <img src={this.incomeIcon} alt="" class={styles['income-icon']} />}
          </transition>
          <transition name="rank-left-icon" mode="out-in">
            {this.isTotalIncomeRank && <img src={incomeLeftIcon} alt="" class={styles['income-left-icon']} />}
          </transition>
          <transition name="rank-right-icon" mode="out-in">
            {this.isTotalIncomeRank && <img src={incomeRightIcon} alt="" class={styles['income-right-icon']} />}
          </transition>
          <transition name="rank-icon" mode="out-in">
            {this.isAngelRank && <img src={this.angelRankIcon} alt="" class={styles['angel-icon']} />}
          </transition>
          <transition name="rank-left-icon" mode="out-in">
            {this.isAngelRank && <img src={angelLeftIcon} alt="" class={styles['angel-left-icon']} />}
          </transition>
          <transition name="rank-right-icon" mode="out-in">
            {this.isAngelRank && <img src={angelRightIcon} alt="" class={styles['angel-right-icon']} />}
          </transition>
          <transition name="rank-icon" mode="out-in">
            {this.isNewBuyRank && (
              <img src={this.newPurchaseRankIcon} alt="" class={styles['new-purchase-icon']} />
            )}
          </transition>
          <transition name="rank-left-icon" mode="out-in">
            {this.isNewBuyRank && (
              <img src={newPurchaseLeftIcon} alt="" class={styles['new-purchase-left-icon']} />
            )}
          </transition>
          <transition name="rank-right-icon" mode="out-in">
            {this.isNewBuyRank && (
              <img src={newPurchaseRightIcon} alt="" class={styles['new-purchase-right-icon']} />
            )}
          </transition>
          <img class={styles['top-name']} src={topNameBg} alt="" />
        </BaseContainer>
        <BaseContainer class={styles['rank-content-bg']} contentClassName={styles['rank-content']}>
          <KeepTabs type="card" defaultName={INCOME} activeKeyName="rankType" tabBarGutter={30}>
            <TabPane key={INCOME} tab={<img class={styles['tab-button']} src={this.incomeTab} />}>
              <Leaderboard info={this.totalIncomeRankInfo} />
            </TabPane>
            <TabPane key={ANGEL} tab={<img class={styles['tab-button']} src={this.angelTab} />}>
              <Leaderboard info={this.angelRankInfo} />
            </TabPane>
            <TabPane key={BUYER} tab={<img class={styles['tab-button']} src={this.buyerTab} />}>
              <Leaderboard info={this.newBuyRankInfo} />
            </TabPane>
          </KeepTabs>
        </BaseContainer>
      </div>
    );
  },
};

export default Rank;
