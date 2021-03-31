<template>
  <base-container>
    <div class="detail-wrapper">
      <div>
        <div class="detail-date">{{ updateTime }}</div>
        <div class="title-wrapper">
          <img class="back-icon" src="@/assets/help/left-arrow.png" alt="" @click="goAnnouncement">
          <div class="detail-title">{{ detail.title }}</div>
        </div>
      </div>
      <div class="detail-content" v-html="detail.content" />
    </div>
  </base-container>
</template>

<script>
import BaseContainer from '@/shared/components/base-container';
import dateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';
import { fetchAnnouncementDetail } from '@/api';

export default {
  components: {
    'base-container': BaseContainer,
  },

  async asyncData({ params }) {
    const {
      body: { mineAnnouncement },
    } = await fetchAnnouncementDetail({
      pathParams: { id: params.id },
    });

    return { detail: mineAnnouncement };
  },
  data() {
    return {
      detail: {},
    };
  },
  computed: {
    updateTime() {
      return dateUtils.formatDateTime(this.detail.updateTime, 'YYYY-MM-DD HH:mm');
    },
  },
  methods: {
    goAnnouncement() {
      locationServices.push('/newsAnnouncement', { query: { type: '3' } });
    },
  },

};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
