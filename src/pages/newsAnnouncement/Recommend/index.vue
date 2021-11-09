<template>
  <Spin :spinning="loading">
    <div class="news-content-wrapper">
      <div class="news-content">
        <NewsItem
          v-for="(item, index) in goodNewsList"
          :key="index"
          :info="item"
        />
      </div>
      <NoData v-if="isListEmpty" />
      <div v-if="noData" class="no-data">{{ $t('allContentLoaded') }}</div>
    </div>
  </Spin>
</template>

<script>
import { Spin } from 'ant-design-vue';
import isEmpty from 'lodash/isEmpty';
import NoData from '@/shared/components/NoData';
import { getGoodNewsList } from '@/api';
import scrollEvent from '@/shared/utils/scrollEvent';
import NewsItem from './NewsItem';

export default {
  components: {
    NewsItem,
    Spin,
    NoData,
  },
  data() {
    return {
      goodNewsList: [],
      pageNum: 1,
      pageSize: 9,
      noData: false,
      loading: true,
      fetching: false,
    };
  },
  computed: {
    isListEmpty() {
      return isEmpty(this.goodNewsList);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
    this.fetchGoodNewsList();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchGoodNewsList() {
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      getGoodNewsList({
        data: {
          pageNum: this.pageNum, pageSize: this.pageSize,
        },
      }).then(data => {
        const { body: { list } } = data;
        this.loading = false;
        this.noData = !isEmpty(list) && list.length < this.pageSize;
        this.goodNewsList = [...this.goodNewsList, ...list];
        this.pageNum += 1;
        this.fetching = false;
      });
    },
    handleScroll() {
      scrollEvent(this.fetchGoodNewsList);
    },
  },
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>
