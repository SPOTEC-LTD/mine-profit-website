<template>
  <a-spin :spinning="loading">
    <div class="news-content-wrapper">
      <div class="news-content">
        <news-item
          v-for="(item, index) in goodNewsList"
          :key="index"
          :info="item"
        />
      </div>
      <div v-if="noData" class="no-data">{{ $t('allContentLoaded') }}</div>
    </div>
  </a-spin>
</template>

<script>
import { Spin } from 'ant-design-vue';
import { getGoodNewsList } from '@/api';
import { RECOMMEND } from '@/shared/consts/newsType';
import NewsItem from './news-item/index.vue';

export default {
  components: {
    'news-item': NewsItem,
    'a-spin': Spin,
  },
  data() {
    return {
      goodNewsList: [],
      pageNum: 1,
      pageSize: 9,
      noData: false,
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
    this.fetchGoodNewsList();
  },
  methods: {
    fetchGoodNewsList() {
      if (this.noData) {
        return;
      }
      getGoodNewsList({
        pathParams: { type: RECOMMEND },
        data: { pageNum: this.pageNum, pageSize: this.pageSize },
      }).then(data => {
        const { body: { list } } = data;
        this.loading = false;
        this.noData = list.length === 0;
        this.goodNewsList = [...this.goodNewsList, ...list];
        this.pageNum += 1;
      });
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight === scrollTop + windowHeight) {
        this.fetchGoodNewsList();
      }
    },
  },
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>
