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
import { fetchGoodNewsDetail } from '@/api';

export default {
  components: {
    'base-container': BaseContainer,
  },

  async asyncData({ params, redirect }) {
    let textInfo = {};
    try {
      const { body } = await fetchGoodNewsDetail({
        pathParams: { id: params.id },
      });
      textInfo = body.textInfo;
    } catch (error) {
      redirect('/500');
    }

    return { detail: textInfo };
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
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
