<template>
  <div @click="goQuestionDetail">
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
import locationServices from '@/shared/services/location/locationServices';

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
  methods: {
    goQuestionDetail() {
      this.locationServices.push('/questionDetail/:id', { params: { id: this.id } });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
