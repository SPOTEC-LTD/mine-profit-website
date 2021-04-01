<template>
  <a-link target="_blank" class="news-wrapper" :to="{ path: '/announcementDetail/:id', params:{ id: info.id }}">
    <div class="news-date">
      {{ updateTime }}
    </div>
    <div class="news-title">{{ info.title }}</div>
  </a-link>
</template>

<script>
import dateUtils from '@/shared/intl/utils/dateUtils';
import Link from '@/shared/components/link';

export default {
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
