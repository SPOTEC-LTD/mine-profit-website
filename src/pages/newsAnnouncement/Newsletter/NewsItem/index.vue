<template>
  <div class="news-wrapper">
    <div class="news-container">
      <div class="news-date">{{ updateTime }}</div>
      <div class="news-title">{{ info.title }}</div>
      <div class="news-content">{{ info.content }}</div>
    </div>
  </div>
</template>

<script>
import dateUtils from '@/shared/intl/utils/dateUtils';

export default {
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
      return dateUtils.formatDateTime(this.info.publishTime, 'YYYY-MM-DD HH:mm');
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
