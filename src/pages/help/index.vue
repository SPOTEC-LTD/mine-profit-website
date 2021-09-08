<template>
  <div class="wrapper">
    <div class="banner-background" />
    <BaseContainer>
      <div class="banner">
        <div>
          <img class="banner-text-img" src="@/assets/help/banner-text.png" alt="" />
        </div>
        <AInput
          v-model="searchValue"
          :maxLength="30"
          class="search-input"
          :placeholder="$t('searchInputPlaceholder')"
          @keyup.enter="onClickSearch"
        >
          <div slot="suffix" class="search-button" @click="onClickSearch">
            <SearchOutlined />
            <span>{{ $t('search') }}</span>
          </div>
        </AInput>
      </div>
      <div ref="boxRef" class="question-result-box">
        <transition
          enter-active-class="fadeInUp"
          leave-active-class="fadeOutUp"
        >
          <div v-show="isVisibleQuestion" class="question">
            <div class="question-top">
              <img class="question-top-img" src="@/assets/help/question-text.png" alt="" />
              <span v-if="isChinese" class="question-top-text">{{ $t('commonProblem') }}</span>
            </div>
            <Spin :spinning="loading">
              <div class="question-content">
                <QuestionItem
                  v-for="item in questionList"
                  :id="item.id"
                  :key="item.id"
                  :question="item.title"
                  :count="item.count"
                />
              </div>
            </Spin>
          </div>
        </transition>
        <transition
          enter-active-class="fadeInRight"
          leave-active-class="fadeOutRight"
        >
          <div v-show="isVisibleResult" ref="resultRef" class="search-result">
            <div class="search-result-top">
              <img class="back-icon" src="@/assets/help/left-arrow.png" alt="" @click="backQuestion" />
              <span>
                {{ $t('searchPrompt', { searchValue: resultSearchValue }) }}
                <span class="result-number">{{ resultNumber }}</span>
                {{ $t('number') }}
              </span>
            </div>
            <Spin :spinning="loading">
              <div v-if="resultNumber !== 0" class="result-box">
                <QuestionItem
                  v-for="item in resultList"
                  :id="item.id"
                  :key="item.id"
                  isHighlight
                  :resultKeyWord="resultSearchValue"
                  :question="item.title"
                  :count="item.count"
                />
              </div>
              <div v-else class="no-result">
                <img src="@/assets/help/no-result.png" alt="" />
              </div>
            </Spin>
          </div>
        </transition>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
import { Input, Spin } from 'ant-design-vue';
import SearchOutlined from 'ahoney/lib/icons/SearchOutlined';
import BaseContainer from '@/shared/components/BaseContainer';
import { fetchQuestionList } from '@/api';
import { getLocalLanguage, getIsChinese } from '@/shared/utils/getLocalLanguage';
import QuestionItem from './QuestionItem';

export default {
  components: {
    BaseContainer,
    AInput: Input,
    Spin,
    SearchOutlined,
    QuestionItem,
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
      locale: getLocalLanguage(),
      isChinese: getIsChinese(),
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
        data: {
          pageNum: 1, pageSize: 6,
        },
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
      if (this.searchValue.trim() === '') {
        this.$router.go(0);
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
      this.searchValue = '';
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
