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
import { SHOW } from '@/shared/consts/visible';
import NewsItem from './news-item/index.vue';
import scrollEvent from '../scrollEvent';

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
      fetching: false,
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
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      getAnnouncementList({ data: { pageNum: this.pageNum, pageSize: this.pageSize, showStatus: SHOW } }).then(data => {
        const { body: { list } } = data;
        this.loading = false;
        this.noData = list.length < this.pageSize;
        this.announcementList = [...this.announcementList, ...list];
        this.pageNum += 1;
        this.fetching = false;
      });
    },
    handleScroll() {
      scrollEvent(this.fetchAnnouncementList);
    },
  },
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>
