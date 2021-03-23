<template>
  <div>
    <div class="news-content">
      <news-item
        v-for="(item, index) in goodNewsList"
        :key="index"
        :info="item"
      />
    </div>
    <div v-if="noData" class="no-data">已加载全部内容</div>
  </div>
</template>

<script>
import { getGoodNewsList } from '@/api';
import NewsItem from './news-item';

export default {
  components: {
    'news-item': NewsItem,
  },
  data() {
    return {
      goodNewsList: [],
      pageNum: 1,
      pageSize: 9,
      noData: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
    this.fetchGoodNewsList();
  },
  methods: {
    async fetchGoodNewsList() {
      if (this.noData) {
        return;
      }
      await getGoodNewsList({
        pathParams: { type: 1 },
        data: { pageNum: this.pageNum, pageSize: this.pageSize },
      }).then(data => {
        const {
          body: { list },
        } = data;
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
