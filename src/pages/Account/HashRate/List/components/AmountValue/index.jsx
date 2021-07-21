import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import styles from './index.less?module';

const AmountValue = {
  props: ['data'],
  render() {
    return (
      <span class={styles['amount-value']}>
      {`${bigNumberToFixed(this.data.amount, 2)}${this.data.unit}`}
    </span>
    );
  },
};

export default AmountValue;
