<template>
  <a-link target="_blank" class="news-wrapper" :to="{ path: '/recommendDetail/:id', params:{ id: info.id }}">
    <div class="image-wrapper">
      <img class="news-image" :src="info.imageUrl" alt="">
    </div>
    <span class="news-date">{{
      updateTime
    }}</span>
    <span class="news-title">{{ info.title }}</span>
  </a-link>
</template>

<script>
import dateUtils from '@/shared/intl/utils/dateUtils';
import Link from '@/shared/components/link';

export default {
  name: 'NewsItem',
  components: {
    'a-link': Link,
  },
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
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
