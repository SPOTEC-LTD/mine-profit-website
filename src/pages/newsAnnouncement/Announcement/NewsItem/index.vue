<template>
  <ALink target="_blank" class="news-wrapper" :to="{ path: urls.announcementDetailPath, params:{ id: info.id }}">
    <div class="news-date">
      {{ updateTime }}
    </div>
    <div class="news-title">{{ info.title }}</div>
  </ALink>
</template>

<script>
import dateUtils from '@/shared/intl/utils/dateUtils';
import * as urls from '@/router/consts/urls';
import Link from '@/shared/components/Link';

export default {
  components: {
    ALink: Link,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      urls,
    };
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
