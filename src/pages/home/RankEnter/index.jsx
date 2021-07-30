import BaseContainer from '@/shared/components/BaseContainer';
import locationServices from '@/shared/services/location/locationServices';
import { rankPath } from '@/router/consts/urls';
import rankEnterText from '@/assets/home/rank-enter-text.png';
import styles from './index.less?module';

const RankEnter = {
  methods: {
    toRankPage() {
      locationServices.push(rankPath);
    },
  },
  render() {
    return (
      <BaseContainer class={styles['rank-enter-wrap']} contentClassName={styles['rank-enter']}>
        <div class={styles['rank-enter-content']}>
          <img class={styles['rank-enter-text']} src={rankEnterText} alt=""/>
          <ul class={styles['rank-type']}>
            <li>{this.$t('totalIncomeRank')}</li>
            <li>{this.$t('angelRank')}</li>
            <li>{this.$t('newBuyRank')}</li>
          </ul>
          <div type="primary" class={styles['view-button']} onClick={this.toRankPage}>
            {this.$t('viewNow')}
          </div>
        </div>
      </BaseContainer>
    );
  },
};

export default RankEnter;
