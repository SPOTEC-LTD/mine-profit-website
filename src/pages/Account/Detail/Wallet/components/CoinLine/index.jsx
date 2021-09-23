import { Button } from 'ant-design-vue';
import CorrectOutlined from 'ahoney/lib/icons/CorrectOutlined';

import styles from './index.less?modules';

const CoinLine = {
  props: {
    lineType: String,
    buttonList: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
  },
  render() {
    return (
      <div class={styles['line-button-box']}>
        {this.buttonList.map(({ text, value }, index) => (
          <Button
            key={index}
            class={[styles['line-button'], this.lineType === value ? styles['btn-blue'] : styles['btn-gray']]}
            disabled={this.disabled && this.lineType !== value}
            onClick={() => this.$emit('changeLine', value)}
          >
            {text}
            {this.lineType === value && (
              <div class={styles['active-button']}>
                <CorrectOutlined />
              </div>
            )}
          </Button>
        ))}
      </div>
    );
  },
};

export default CoinLine;
