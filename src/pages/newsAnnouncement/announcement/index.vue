<template>
  <a-spin :spinning="loading">
    <div class="news-content">
      <div class="news-box">
        <news-item
          v-for="(item, index) in announcementList"
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
import { getAnnouncementList } from '@/api';
import NewsItem from './news-item/index.vue';

export default {
  components: {
    'news-item': NewsItem,
    'a-spin': Spin,
  },
  data() {
    return {
      announcementList: [],
      pageNum: 1,
      pageSize: 8,
      noData: false,
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
    this.fetchAnnouncementList();
  },
  methods: {
    fetchAnnouncementList() {
      if (this.noData) {
        return;
      }
      getAnnouncementList({ data: { pageNum: this.pageNum, pageSize: this.pageSize } }).then(data => {
        const { body: { list } } = data;
        this.loading = false;
        this.noData = list.length === 0;
        this.announcementList = [...this.announcementList, ...list];
        this.pageNum += 1;
      });
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight === scrollTop + windowHeight) {
        this.fetchAnnouncementList();
      }
    },
  },
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>
