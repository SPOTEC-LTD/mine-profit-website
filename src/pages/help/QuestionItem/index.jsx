import TextHighlighter from 'vue-highlight-words';
import Link from '@/shared/components/Link';
import { questionDetailPath } from '@/router/consts/urls';
import formatViewCount from '@/shared/utils/formatViewCount';

import styles from './index.less?module';

const QuestionItem = {
  props: {
    question: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
    },
    resultKeyWord: {
      type: String,
      default: '',
    },
    count: Number,
    isHighlight: {
      type: Boolean,
      default: () => false,
    },
  },
  render() {
    return (
      <Link
        target="_blank"
        class={styles['question-wrapper']}
        to={{ path: questionDetailPath, params: { id: this.id } }}
      >
        <div class={styles['question-item-wrap']}>
          {this.isHighlight && (
            <TextHighlighter
              class={styles['question-item']}
              searchWords={[this.resultKeyWord]}
              autoEscape
              textToHighlight={this.question}
            />
          )}
          {!this.isHighlight && <div class={styles['question-item']}>{this.question}</div>}
          <span>{`${this.$t('viewCount')}：${formatViewCount(this.count)}`}</span>
        </div>
      </Link>
    );
  },
};

export default QuestionItem;
