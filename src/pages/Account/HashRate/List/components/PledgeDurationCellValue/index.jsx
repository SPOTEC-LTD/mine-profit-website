import CellValue from '@/pages/Account/HashRate/List/components/CellValue';

const PledgeDurationCellValue = {
  props: {
    data: Object,
  },

  render() {
    return (<CellValue value={`${this.data.passTime}/${this.data.pledgeDuration}`} unit={this.$t('day')} />);
  },
};

export default PledgeDurationCellValue;
