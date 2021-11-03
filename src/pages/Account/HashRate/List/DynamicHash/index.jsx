import { mapState } from 'vuex';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import OutputLineChart from './OutputLineChart';
import styles from './index.less?module';

const DynamicHash = {
  computed: {
    ...mapState({
      dynamicHashInfo: state => state.hashRate.dynamicHashInfo,
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),

    dynamicChain() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      return chainInfo.symbol;
    },
  },
  methods: {
    getChainInfoList() {
      const {
        cumulativeRepurchase, hashrateType, todayExpectedOutput,
        unitOutput, unit, cumulativeRepurchaseUsdt,
      } = this.dynamicHashInfo;

      return [
        {
          label: this.$t('todayPreOutput'),
          value: bigNumberToFixed(todayExpectedOutput || 0, 8),
          unit: hashrateType,
        },
        {
          label: this.$t('unitOutput'),
          value: bigNumberToFixed(unitOutput || 0, 8),
          unit: `${hashrateType}/${unit}`,
        },
        {
          label: this.$t('cumulativeRepurchase'),
          value: bigNumberToFixed(cumulativeRepurchase || 0, 8),
          unit: hashrateType,
        },
        {
          label: this.$t('cumulativeRepurchaseValue'),
          value: bigNumberToFixed(cumulativeRepurchaseUsdt || 0, 10),
          unit: 'USDT',
        },
      ];
    },
  },

  render() {
    const { outputList } = this.dynamicHashInfo;

    return (
      <div class={styles['dynamic-hash']}>
        <div class={styles['dynamic-info']}>
          {this.getChainInfoList().map((item, index) => (
            <div ket={index}>
              <div class={styles.label}>{item.label}</div>
              <div>{`${item.value} ${item.unit}`}</div>
            </div>
          ))}
        </div>
        <div class={styles['dynamic-trend']}>
          <OutputLineChart
            dataSource={outputList}
            chainName={this.dynamicChain}
          />
        </div>
      </div>
    );
  },
};

export default DynamicHash;
