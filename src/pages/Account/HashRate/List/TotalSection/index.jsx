import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import styles from './index.less?module';

const TotalSection = {
  props: {
    statistics: {
      type: Array,
      default: [],
    },
    hashrateType: {
      type: String,
      default: 'BTC',
    },
  },

  computed: {
    statisticData() {
      const result = this.statistics.find(({ hashrateType }) => hashrateType === this.hashrateType);
      return result || {
        totalOutput: 0,
        yesterdayTotalOutput: 0,
        totalAmount: 0,
        unit: '',
      };
    },

    outputData() {
      return [
        {
          label: this.$t('hashrateTotalHash'),
          value: bigNumberToFixed(this.statisticData.totalAmount, 2),
          unit: this.statisticData.unit,
        },
        {
          label: this.$t('hashrateAllNetOutput'),
          value: bigNumberToFixed(this.statisticData.totalOutput, 8),
          unit: this.hashrateType,
        },
        {
          label: this.$t('hashrateYesterdayNetOutput'),
          value: bigNumberToFixed(this.statisticData.yesterdayTotalOutput, 8),
          unit: this.hashrateType,
          usePlus: true,
        },
      ];
    },
  },

  render() {
    return (
      <div class={styles.output}>
        {this.outputData.map(item => (
          <div class={styles['output-item']}>
            <div class={styles['output-item-label']}>{item.label}</div>
            <div class={styles['output-item-value']}>
              <span>{item.usePlus && item.value > 0 ? `+${item.value}` : item.value}</span>
              <span class={styles['output-item-value-unit']}>{item.unit}</span>
            </div>
          </div>
        ))}
    </div>
    );
  },
};

export default TotalSection;
