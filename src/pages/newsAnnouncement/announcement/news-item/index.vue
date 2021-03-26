<template>
  <div class="news-wrapper" @click="goDetail(info.id)">
    <div class="news-date">
      {{ updateTime }}
    </div>
    <div class="news-title">{{ info.title }}</div>
  </div>
</template>

<script>
import dateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';

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
      return dateUtils.formatDateTime(this.info.updateTime, 'YYYY-MM-DD HH:mm');
    },
  },
  methods: {
    goDetail(id) {
      locationServices.push('/announcementDetail/:id', { params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
