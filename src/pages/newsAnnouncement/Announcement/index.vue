<template>
  <Spin :spinning="loading">
    <div class="news-content">
      <div class="news-box">
        <AnnouncementItem
          v-for="(item, index) in announcementList"
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
import { getAnnouncementList } from '@/api';
import scrollEvent from '@/shared/utils/scrollEvent';
import AnnouncementItem from './AnnouncementItem';

export default {
  components: {
    AnnouncementItem,
    Spin,
    NoData,
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
  computed: {
    isListEmpty() {
      return isEmpty(this.announcementList);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
    this.fetchAnnouncementList();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchAnnouncementList() {
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      getAnnouncementList({
        data: {
          pageNum: this.pageNum, pageSize: this.pageSize,
        },
      }).then(data => {
        const { body: { list } } = data;
        this.loading = false;
        this.noData = !isEmpty(list) && list.length < this.pageSize;
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
