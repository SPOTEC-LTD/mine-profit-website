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
      <div v-if="noData" class="no-data">{{ $t('allContentLoaded') }}</div>
    </div>
  </Spin>
</template>

<script>
import { Spin } from 'ant-design-vue';
import { getGoodNewsList } from '@/api';
import scrollEvent from '@/shared/utils/scrollEvent';
import NewsItem from './NewsItem';

export default {
  components: {
    NewsItem,
    Spin,
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
        this.noData = list.length < this.pageSize;
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
