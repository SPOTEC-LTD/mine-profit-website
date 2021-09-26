import { Tooltip } from 'ant-design-vue';
import TextHighlighter from 'vue-highlight-words';

import styles from './index.less?module';

const BonusTooltip = {
  props: {
    word: String,
    text: String,
    label: String,
  },
  methods: {
    getTooltipTitle({ word, text, label }) {
      return (
        <div>
          <div class={styles['tooltip-content-label']}>{label}</div>
          <TextHighlighter
            class={styles['tooltip-content']}
            searchWords={[word]}
            autoEscape
            textToHighlight={text}
          />
        </div>
      );
    },
  },
  render() {
    return (
      <Tooltip
        placement="bottom"
        overlayClassName={styles.tooltip}
        scopedSlots={{
          title: () => {
            return this.getTooltipTitle({
              word: this.word,
              text: this.text,
              label: this.label,
            });
          },
        }}
      >
        {this.$scopedSlots.default()}
      </Tooltip>
    );
  },
};

export default BonusTooltip;
