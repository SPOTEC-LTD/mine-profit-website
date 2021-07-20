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
          value: this.statisticData.totalOutput,
          unit: this.statisticData.unit,
        },
        {
          label: this.$t('hashrateAllNetOutput'),
          value: this.statisticData.totalOutput,
          unit: this.hashrateType,
        },
        {
          label: this.$t('hashrateYesterdayNetOutput'),
          value: this.statisticData.yesterdayTotalOutput,
          unit: this.hashrateType,
          usePlus: true,
        },
      ];
    },
  },

  render() {
    return (
      <div class={styles.output}>
        {this.outputData.map(item => {
          const resultValue = bigNumberToFixed(item.value, 8);
          return (
            <div class={styles['output-item']}>
              <div>{item.label}</div>
              <div
                class={styles['output-item-value']}
              >
                <span>{item.usePlus && resultValue > 0 ? `+${resultValue}` : resultValue}</span>
                <span class={styles['output-item-value-unit']}>{this.hashrateType}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export default TotalSection;
