<template>
  <div class="news-wrapper" @click="goDetail(info.id)">
    <div class="image-wrapper">
      <img class="news-image" :src="info.imageUrl" alt="">
    </div>
    <span class="news-date">{{
      updateTime
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
    return {};
  },
  computed: {
    updateTime() {
      return dateUtils.formatDateTime(this.info.updateTime, 'YYYY-MM-DD HH:mm');
    },
  },
  methods: {
    goDetail(id) {
      locationServices.push('/recommendDetail/:id', { params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
