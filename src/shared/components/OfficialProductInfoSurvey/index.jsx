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
    const { amount, unit, income, chainType } = this.dataSource;
    return (
      <div class={['official-product-survey-wrapper', this.className]} >
        {this.cellNode({ name: this.$t('marketPartHash'), mount: amount, unit: `${unit}/${this.$t('part')}` })}
        {this.cellNode({ name: this.$t('marketNetOutput'), mount: income, unit: chainType })}
        {this.cellNode({ name: this.$t('hashrateTime'), mount: 'T+1', unit: this.$t('day') })}
      </div>
    );
  },
};

export default OfficialProductInfoSurvey;
