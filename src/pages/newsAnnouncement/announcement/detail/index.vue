<template>
  <base-container>
    <div class="detail-wrapper">
      <div class="title-wrapper">
        <div class="detail-date">{{ updateTime }}</div>
        <div class="detail-title">{{ detail.title }}</div>
      </div>
      <div class="detail-content" v-html="detail.content" />
    </div>
  </base-container>
</template>

<script>
import BaseContainer from '@/shared/components/base-container';
import dateUtils from '@/shared/intl/utils/dateUtils';
import { fetchAnnouncementDetail } from '@/api';

export default {
  components: {
    'base-container': BaseContainer,
  },

  async asyncData({ params, redirect }) {
    const props = {
      detail: { },
    };
    try {
      const {
        body: { mineAnnouncement },
      } = await fetchAnnouncementDetail({
        pathParams: { id: params.id },
      });

      props.detail = mineAnnouncement;
    } catch (error) {
      redirect('/500');
      console.log('error', error);
    }

    return props;
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
  mounted() {
    fetchAnnouncementDetail({
      pathParams: { id: 4 },
    });
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
