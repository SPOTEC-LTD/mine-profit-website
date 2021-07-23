<template>
  <ALink target="_blank" class="question-wrapper" :to="{ path: '/questionDetail/:id', params:{ id }}">
    <TextHighlighter
      v-if="isHighlight"
      class="question-item"
      :searchWords="[resultKeyWord]"
      :autoEscape="true"
      :textToHighlight="question"
    />
    <div v-else class="question-item">
      {{ question }}
    </div>
  </ALink>
</template>

<script>
import TextHighlighter from 'vue-highlight-words';
import locationServices from '@/shared/services/location/locationServices';
import ALink from '@/shared/components/Link';

export default {
  name: 'QuestionItem',
  components: {
    TextHighlighter,
    ALink,
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
