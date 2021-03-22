<template>
  <div>
    <text-highlighter
      v-if="isHighlight"
      class="question-item"
      :search-words="[resultKeyWord]"
      :auto-escape="true"
      :text-to-highlight="question"
    />
    <div v-else class="question-item">
      {{ question }}
    </div>
  </div>
</template>

<script>
import TextHighlighter from 'vue-highlight-words';

export default {
  name: 'QuestionItem',
  components: {
    'text-highlighter': TextHighlighter,
  },
  props: {
    question: {
      type: String,
      default: '',
    },
    resultKeyWord: {
      type: String,
      default: '',
    },
    isHighlight: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
