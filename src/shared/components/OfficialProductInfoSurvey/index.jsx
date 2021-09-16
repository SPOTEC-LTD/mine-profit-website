import DateUtils from '@/shared/intl/utils/dateUtils';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import './index.less';

const OfficialProductInfoSurvey = {
  props: {
    className: { type: String },
    dataSource: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    cellNode({ name, mount, unit }) {
      return (
        <div class='product-cell-node-wrapper'>
          <span>{name}</span>
          <div>
            <span>{mount}</span>
            <span class='product-cell-node-unit'>{unit}</span>
          </div>
        </div>
      );
    },
  },

  render() {
    const { amount, unit, income, chainType, preStatus, workStartTime } = this.dataSource;
    return (
      <div class={['official-product-survey-wrapper', this.className]} >
        {this.cellNode({ name: this.$t('marketPartHash'), mount: amount, unit: `${unit}/${this.$t('part')}` })}
        {this.cellNode({ name: this.$t('marketNetOutput'), mount: bigNumberToFixed(income, 8), unit: chainType })}
        {this.cellNode({
          name: this.$t('hashrateTime'),
          mount: preStatus ? DateUtils.formatDateTime(workStartTime) : 'T+1',
          unit: preStatus ? '' : this.$t('day'),
        })}
      </div>
    );
  },
};

export default OfficialProductInfoSurvey;
