import { Row, Col } from 'ant-design-vue';
import slice from 'lodash/slice';
import fill from 'lodash/fill';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import RankCard from '@/shared/components/RankCard';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import rewardImg from '@/assets/rank/reward-img.png';
import { INCOME, ANGEL, BUYER } from '@/pages/Rank/consts/rankType';
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
      const { length } = this.info.topList;
      if (length < 10) {
        return [...this.topList, ...fill(new Array(10 - length), {})];
      }
      return this.info.topList;
    },
    unit() {
      return this.$route.query.rankType === BUYER ? 'T' : 'USDT';
    },
  },
  render() {
    const { duration, date, sort, nickName, amount, avatar } = this.info;
    const topFive = slice(this.formatTopList, 0, 5);
    const topFiveAfter = slice(this.formatTopList, 5, 10);
    const { rankType = INCOME } = this.$route.query;

    return (
      <div class={styles.leaderboard}>
        <div class={styles.duration}>
          <div>
            <div class={styles['duration-value']}>{this.$t('issue', { value: duration })}</div>
            <div class={styles['duration-scope']}>{date}</div>
          </div>
        </div>
        <div class={[styles['my-ranking'], { [styles['en-my-ranking']]: this.isEnglish }]}>
          <Row gutter={[30, 0]}>
            <Col span={12}>
              <RankCard position={sort} amount={amount} name={nickName} avatar={avatar} unit={this.unit} />
            </Col>
            <Col span={12}>
              <div class={styles['check-reward-set']}>
                <TriangleFilled />
                <div>{this.$t('checkRewardSet')}</div>
                <img class={styles['reward-img']} src={rewardImg} alt="" />
              </div>
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
          </Row>
          <div class={styles['view-history-box']}>
            <div class={styles['view-history']}>{this.$t('viewHistoryRank')}</div>
          </div>
        </div>
        {rankType === INCOME && (
          <div class={styles['rules-text']}>
            <div>{this.$t('incomeRankRule1')}</div>
            <div>{this.$t('incomeRankRule2')}</div>
          </div>
        )}
        {rankType === ANGEL && (
          <div class={styles['rules-text']}>
            <div>{this.$t('newBuyRankRule1')}</div>
            <div>{this.$t('newBuyRankRule2')}</div>
          </div>
        )}
        {rankType === BUYER && (
          <div class={styles['rules-text']}>
            <div>{this.$t('angelRankRule1')}</div>
            <div>{this.$t('angelRankRule2')}</div>
            <div>{this.$t('angelRankRule3')}</div>
            <div>{this.$t('angelRankRule4')}</div>
          </div>
        )}
      </div>
    );
  },
};

export default Leaderboard;
