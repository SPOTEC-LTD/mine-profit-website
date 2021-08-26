<template>
  <Spin :spinning="loading">
    <div class="news-content">
      <div class="news-box">
        <NewsItem
          v-for="(item, index) in newsletterList"
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
import { getNewsletterList } from '@/api';
import scrollEvent from '@/shared/utils/scrollEvent';
import NewsItem from './NewsItem/index.vue';

export default {
  components: {
    NewsItem,
    Spin,
  },
  data() {
    return {
      newsletterList: [],
      pageNum: 1,
      pageSize: 5,
      noData: false,
      loading: true,
      fetching: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
    this.fetchNewsletterList();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchNewsletterList() {
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      getNewsletterList({
        data: {
          pageNum: this.pageNum, pageSize: this.pageSize,
        },
      }).then(data => {
        const { body: { list } } = data;
        this.loading = false;
        this.noData = list.length < this.pageSize;
        this.newsletterList = [...this.newsletterList, ...list];
        this.pageNum += 1;
        this.fetching = false;
      });
    },
    handleScroll() {
      scrollEvent(this.fetchNewsletterList);
    },
  },
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>
