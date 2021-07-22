import { Button } from 'ant-design-vue';
import styles from './index.less?module';

const ModalButton = {
  render() {
    return (
      <Button
        class={styles['modal-button']}
        {...{
          on: this.$listeners,
          props: this.$attrs,
        }}>
        {this.$scopedSlots.default()}
      </Button>
    );
  },
};

export default ModalButton;
