<template>
  <base-container>
    <div class="detail-wrapper">
      <div class="title-wrapper">
        <div class="detail-date">{{ updateTime }}</div>
        <div class="detail-title">{{ detail.question }}</div>
      </div>
      <div class="detail-content" v-html="detail.answer" />
    </div>
  </base-container>
</template>

<script>
import BaseContainer from '@/shared/components/base-container';
import dateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';
import { fetchQuestionDetail } from '@/api';

export default {
  components: {
    'base-container': BaseContainer,
  },

  async asyncData({ params }) {
    const { body: { mineQuestion } } = await fetchQuestionDetail({ pathParams: { id: params.id } });
    return { detail: mineQuestion };
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
    goHelp() {
      locationServices.push('/help');
    },
  },

};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
