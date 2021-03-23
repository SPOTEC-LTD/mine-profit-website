<template>
  <div class="news-wrapper" @click="goDetail(info.id)">
    <img class="news-image" :src="info.imageUrl" alt="">
    <span class="news-date">{{
      dateUtils.formatDateTime(info.updateTime, "YYYY-MM-DD HH:mm")
    }}</span>
    <span class="news-title">{{ info.title }}</span>
  </div>
</template>

<script>
import dateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';

export default {
  name: 'NewsItem',
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dateUtils,
      locationServices,
    };
  },
  methods: {
    goDetail(id) {
      this.locationServices.push('/recommendDetail', { params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
