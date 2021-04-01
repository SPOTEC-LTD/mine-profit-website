<template>
  <a-link target="_blank" class="question-wrapper" :to="{ path: '/questionDetail/:id', params:{ id }}">
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
  </a-link>
</template>

<script>
import TextHighlighter from 'vue-highlight-words';
import locationServices from '@/shared/services/location/locationServices';
import Link from '@/shared/components/link';

export default {
  name: 'QuestionItem',
  components: {
    'text-highlighter': TextHighlighter,
    'a-link': Link,
  },
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
    isHighlight: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      locationServices,
    };
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
