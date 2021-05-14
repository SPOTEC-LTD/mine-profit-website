<template>
  <a-spin :spinning="loading">
    <div class="news-content">
      <div class="news-box">
        <news-item
          v-for="(item, index) in newsletterList"
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
import { getNewsletterList } from '@/api';
import { NEWSLETTER } from '@/shared/consts/newsType';
import { SHOW } from '@/shared/consts/visible';
import getLocalLanguage from '@/shared/utils/getLocalLanguage';
import NewsItem from './news-item/index.vue';
import scrollEvent from '../scrollEvent';

export default {
  components: {
    'news-item': NewsItem,
    'a-spin': Spin,
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
  methods: {
    fetchNewsletterList() {
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      getNewsletterList({
        pathParams: { type: NEWSLETTER },
        data: {
          pageNum: this.pageNum, pageSize: this.pageSize, showStatus: SHOW, locale: getLocalLanguage(),
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
