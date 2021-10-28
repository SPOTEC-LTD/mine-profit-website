import { Row, Col } from 'ant-design-vue';
import slice from 'lodash/slice';
import fill from 'lodash/fill';
import isEmpty from 'lodash/isEmpty';
import { mapMutations, mapActions } from 'vuex';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import RankCard from '@/shared/components/RankCard';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import rewardImg from '@/assets/rank/reward-img.png';
import { RANK, UPDATE_REWARD_SET_LIST, GET_REWARD_SET_LIST } from '@/modules/rank';
import { INCOME, ANGEL, BUYER, rankTypeMap } from '@/pages/Rank/consts/rankType';
import BaseModal from '@/shared/components/BaseModal';
import NoData from '@/shared/components/NoData';
import locationServices from '@/shared/services/location/locationServices';
import { historyRankPath } from '@/router/consts/urls';
import RewardSet from '../RewardSet';
import styles from './index.less?module';

const Leaderboard = {
  props: {
    info: Object,
  },
  data() {
    return {
      isEnglish: getIsEnglish(),
    };
  },
  computed: {
    formatTopList() {
      if (!this.info.topList) {
        return [];
      }
      const { length } = this.info.topList;
      if (length < 10 && length > 0) {
        return [...this.topList, ...fill(new Array(10 - length), {})];
      }
      return this.info.topList;
    },
    unit() {
      return this.$route.query.rankType === BUYER ? 'T' : 'USDT';
    },
  },
  methods: {
    ...mapActions(RANK, [GET_REWARD_SET_LIST]),
    ...mapMutations(RANK, [UPDATE_REWARD_SET_LIST]),
    onModalClose() {
      this[UPDATE_REWARD_SET_LIST]([]);
    },
    onModalOpen() {
      const { rankType = INCOME } = this.$route.query;
      this[GET_REWARD_SET_LIST]({ topType: rankTypeMap[rankType] });
    },
  },
  render() {
    const { duration, date, sort, nickName, amount, avatar, userId } = this.info;
    const topFive = slice(this.formatTopList, 0, 5);
    const topFiveAfter = slice(this.formatTopList, 5, 10);
    const { rankType = INCOME } = this.$route.query;

    return (
      <div class={styles.leaderboard}>
        <div class={styles.duration}>
          <div>
            <div class={styles['duration-value']}>{this.$t('issue', { value: duration || '-' })}</div>
            <div class={styles['duration-scope']}>{date}</div>
          </div>
        </div>
        <div class={[styles['my-ranking'], { [styles['en-my-ranking']]: this.isEnglish }]}>
          <Row gutter={[30, 0]}>
            <Col span={12}>
              <RankCard
                isShowLogin={!userId}
                position={sort}
                amount={amount}
                name={nickName}
                avatar={avatar}
                unit={this.unit}
              />
            </Col>
            <Col span={12}>
              <BaseModal
                title={this.$t('issueRewardSettings')}
                width={506}
                onClose={this.onModalClose}
                onOpen={this.onModalOpen}
                scopedSlots={{
                  content: () => <RewardSet />,
                }}
              >
                <div class={styles['check-reward-set']}>
                  <TriangleFilled />
                  <div>{this.$t('checkRewardSet')}</div>
                  <img class={styles['reward-img']} src={rewardImg} onClick={e => e.stopPropagation()} alt="" />
                </div>
              </BaseModal>
            </Col>
          </Row>
        </div>
        <div class={[styles['all-ranking'], { [styles['en-all-ranking']]: this.isEnglish }]}>
          <Row gutter={[30, 0]}>
            <Col span={12}>
              {topFive.map((item, index) => (
                <RankCard
                  position={index + 1}
                  amount={item.amount}
                  name={item.nickName}
                  avatar={item.avatar}
                  unit={this.unit}
                />
              ))}
            </Col>
            <Col span={12}>
              {topFiveAfter.map((item, index) => (
                <RankCard
                  position={index + 6}
                  amount={item.amount}
                  name={item.nickName}
                  avatar={item.avatar}
                  unit={this.unit}
                />
              ))}
            </Col>
            {
              isEmpty(this.formatTopList) && (
              <Col span={24}>
                <NoData class={styles['no-data']} />
              </Col>)
            }
          </Row>
          <div class={styles['view-history-box']}>
            <div
              class={styles['view-history']}
              onClick={ () => locationServices.push(historyRankPath, { query: { rankType: this.$route.query.rankType } }) }
            >
              {this.$t('viewHistoryRank')}
            </div>
          </div>
        </div>
        {rankType === INCOME && (
          <div class={styles['rules-text']}>
            <div>{this.$t('incomeRankRule1')}</div>
            <div>{this.$t('incomeRankRule2', { enProductName: this.$t('enProductName') })}</div>
          </div>
        )}
        {rankType === ANGEL && (
          <div class={styles['rules-text']}>
            <div>{this.$t('newBuyRankRule1')}</div>
            <div>{this.$t('newBuyRankRule2', { enProductName: this.$t('enProductName') })}</div>
          </div>
        )}
        {rankType === BUYER && (
          <div class={styles['rules-text']}>
            <div>{this.$t('angelRankRule1')}</div>
            <div>{this.$t('angelRankRule2')}</div>
            <div>{this.$t('angelRankRule3')}</div>
            <div>{this.$t('angelRankRule4', { enProductName: this.$t('enProductName') })}</div>
          </div>
        )}
      </div>
    );
  },
};

export default Leaderboard;
