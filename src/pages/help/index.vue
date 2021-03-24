<template>
  <div class="wrapper">
    <div class="banner-background" />
    <base-container>
      <div class="banner">
        <div>
          <img class="banner-text-img" src="@/assets/help/banner-text.png" alt="">
        </div>
        <a-input
          v-model="searchValue"
          :max-length="30"
          class="search-input"
          :placeholder="$t('searchInputPlaceholder')"
          @keyup.enter="onClickSearch">
          <div slot="suffix" class="search-button" @click="onClickSearch">
            <search-outlined />
            <span>{{ $t('search') }}</span>
          </div>
        </a-input>
      </div>
      <div ref="boxRef" class="question-result-box">
        <transition
          enter-active-class="fadeInUp"
          leave-active-class="fadeOutUp"
        >
          <div v-show="isVisibleQuestion" class="question">
            <div class="question-top">
              <img class="question-top-img" src="@/assets/help/question-text.png" alt="">
              <span class="question-top-text">{{ $t('commonProblem') }}</span>
            </div>
            <a-spin :spinning="loading">
              <div class="question-content">
                <question-item v-for="(item,index) in questionList" :id="item.id" :key="index" :question="item.question" />
              </div>
            </a-spin>
          </div>
        </transition>
        <transition
          enter-active-class="fadeInRight"
          leave-active-class="fadeOutRight"
        >
          <div v-show="isVisibleResult" ref="resultRef" class="search-result">
            <div class="search-result-top">
              <img class="back-icon" src="@/assets/help/left-arrow.png" alt="" @click="backQuestion">
              <span>
                {{ $t('searchPrompt', { searchValue: resultSearchValue }) }}
                <span class="result-number">{{ resultNumber }}</span>
                {{ $t('number') }}
              </span>
            </div>
            <a-spin :spinning="loading">
              <div v-if="resultNumber !== 0" class="result-box">
                <question-item
                  v-for="(item,index) in resultList"
                  :id="item.id"
                  :key="index"
                  is-highlight
                  :result-key-word="resultSearchValue"
                  :question="item.question"
                />
              </div>
              <div v-else class="no-result">
                <img src="@/assets/help/no-result.png" alt="">
              </div>
            </a-spin>
          </div>
        </transition>
      </div>
    </base-container>
  </div>
</template>

<script>
import Input from 'ant-design-vue/lib/input';
import Spin from 'ant-design-vue/lib/spin';
import SearchOutlined from 'ahoney/lib/icons/SearchOutlined';
import BaseContainer from '@/shared/components/base-container';
import { fetchQuestionList } from '@/api';
import QuestionItem from './question-item';

export default {
  components: {
    'base-container': BaseContainer,
    'a-input': Input,
    'a-spin': Spin,
    'search-outlined': SearchOutlined,
    'question-item': QuestionItem,
  },
  data() {
    return {
      searchValue: '',
      resultSearchValue: '',
      resultNumber: 0,
      questionList: [],
      resultList: [],
      isFirstSearch: true,
      isVisibleQuestion: false,
      isVisibleResult: false,
      loading: false,
    };
  },
  mounted() {
    this.fetchCommonProblem();
    this.isVisibleQuestion = true;
  },
  methods: {
    fetchCommonProblem() {
      this.loading = true;
      this.questionList = [];
      fetchQuestionList({
        data: { pageNum: 1, pageSize: 6 },
      }).then(data => {
        this.loading = false;
        const { body: { list } } = data;
        this.questionList = list;
      });
    },
    onClickSearch() {
      if (this.isFirstSearch && this.searchValue === '') {
        return;
      }
      if (this.searchValue === '') {
        this.backQuestion();
        return;
      }
      this.resultList = [];
      this.resultNumber = 0;
      this.resultSearchValue = this.searchValue;
      this.isVisibleQuestion = false;
      this.isVisibleResult = true;
      this.loading = true;
      this.$refs.boxRef.style.height = '235px';

      fetchQuestionList({
        data: { title: this.searchValue },
      }).then(data => {
        this.loading = false;
        const { body: { list } } = data;
        this.resultNumber = list.length;
        this.resultList = list;
        this.$nextTick(() => {
          this.$refs.boxRef.style.height = `${this.$refs.resultRef.offsetHeight}px`;
        });
      });
      this.isFirstSearch = false;
    },
    backQuestion() {
      this.$nextTick(() => {
        this.$refs.boxRef.style.height = '100%';
      });
      this.isVisibleQuestion = true;
      this.isVisibleResult = false;
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
