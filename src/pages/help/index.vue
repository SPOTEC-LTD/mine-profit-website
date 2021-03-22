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
          placeholder="搜索您想问的问题"
          @keyup.enter="onClickSearch">
          <div slot="suffix" class="search-button" @click="onClickSearch">
            <search-outlined />
            <span>搜索</span>
          </div>
        </a-input>
      </div>
      <div class="question-result-box">
        <div ref="question" class="question fadeInUp">
          <div class="question-top">
            <img class="question-top-img" src="@/assets/help/question-text.png" alt="">
            <span class="question-top-text">常见问题</span>
          </div>
          <div class="question-content">
            <question-item v-for="(item,index) in questionList" :key="index" :question="item.question" />
          </div>
        </div>
        <div ref="result" class="search-result">
          <div class="search-result-top">
            <img class="back-icon" src="@/assets/help/left-arrow.png" alt="" @click="backQuestion">
            <span>关于“{{ resultSearchValue }}”的搜索结果共有 <span class="result-number">{{ resultNumber }}</span> 条</span>
          </div>
          <div class="result-box">
            <question-item
              v-for="(item,index) in resultList"
              :key="index"
              is-highlight
              :result-key-word="resultSearchValue"
              :question="item.question"
            />
          </div>
        </div>
      </div>
    </base-container>
  </div>
</template>

<script>
import Input from 'ant-design-vue/lib/input';
import SearchOutlined from 'ahoney/lib/icons/SearchOutlined';
import BaseContainer from '@/shared/components/base-container';
import QuestionItem from './question-item';

export default {
  components: {
    'base-container': BaseContainer,
    'a-input': Input,
    'search-outlined': SearchOutlined,
    'question-item': QuestionItem,
  },
  data() {
    const resultList = [{
      question: '上架时间T+1是什么意思？',
    },
    {
      question: '为什么上架？',
    },
    {
      question: '上架的算力可以下架吗？',
    }];
    return {
      searchValue: '',
      resultSearchValue: '',
      resultNumber: resultList.length,
      questionList: [{
        question: '上架时间T+1是什么意思？',
      },
      {
        question: '上架时间T+1是什么意思？',
      },
      {
        question: '上架时间T+1是什么意思？',
      },
      {
        question: '上架时间T+1是什么意思？',
      },
      {
        question: '上架时间T+1是什么意思？',
      },
      {
        question: '上架时间T+1是什么意思？',
      },
      {
        question: '上架时间T+1是什么意思？',
      }],
      resultList,
      isFirstSearch: true,
    };
  },
  methods: {
    onClickSearch() {
      if (this.isFirstSearch && this.searchValue === '') {
        return;
      }
      this.resultSearchValue = this.searchValue;
      if (this.searchValue === '') {
        this.backQuestion();
      } else {
        this.$refs.question.classList.remove('fadeInUp');
        this.$refs.result.classList.remove('fadeOutRight');
        this.$refs.question.classList.add('fadeOutUp');
        this.$refs.result.classList.add('fadeInRight');
      }
      this.isFirstSearch = false;
    },
    backQuestion() {
      this.$refs.question.classList.remove('fadeOutUp');
      this.$refs.result.classList.remove('fadeInRight');
      this.$refs.question.classList.add('fadeInUp');
      this.$refs.result.classList.add('fadeOutRight');
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
