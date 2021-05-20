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
import { RECOMMEND } from '@/shared/consts/newsType';
import { SHOW } from '@/shared/consts/visible';
import getLocalLanguage from '@/shared/utils/getLocalLanguage';
import NewsItem from './NewsItem/index.vue';
import scrollEvent from '../scrollEvent';

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
  methods: {
    fetchGoodNewsList() {
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      getGoodNewsList({
        pathParams: { type: RECOMMEND },
        data: {
          pageNum: this.pageNum, pageSize: this.pageSize, showStatus: SHOW, locale: getLocalLanguage(),
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
