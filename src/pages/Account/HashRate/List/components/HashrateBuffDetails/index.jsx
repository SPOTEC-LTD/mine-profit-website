import { Spin } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import { mapState } from 'vuex';
import hashrateBuffIcon from '@/assets/account/hashrate-buff-icon.png';
import styles from './index.less?module';

const HashrateBuffDetails = {
  props: {
    loading: { type: Boolean, default: false },
  },
  computed: {
    ...mapState({
      list: state => state.hashRate.hashrateBuffList,
    }),
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class={styles.wrapper}>
          <img class={styles.icon} src={hashrateBuffIcon} alt="" />
          <div class={styles.title}>{this.$t('hashrateBuff')}</div>
          <div class={styles.description}>{this.$t('hashRateBuffDialogDesc')}</div>
          <div class={styles['table-box']}>
            <table cellspacing={0} class={styles.table}>
              <tr>
                <th>{this.$t('additionRatio')}</th>
                <th>{this.$t('hashrateBuff')}</th>
                <th>{this.$t('additionTime')}</th>
              </tr>
              {this.list.map(({ buffRate, id, passTime, buffDays, amount, unit }) => (
                <tr key={id} class={styles['table-item']}>
                  <td>{numberUtils.formatPercent(buffRate, { usePlus: true, minimumFractionDigits: 2 })}</td>
                  <td>{`${numberUtils.formatNumber(amount, { minimumFractionDigits: 2 })} ${unit}`}</td>
                  <td>{`${passTime}/${buffDays} ${this.$t('day')}`}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </Spin>
    );
  },
};

export default HashrateBuffDetails;
