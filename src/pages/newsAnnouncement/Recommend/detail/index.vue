<template>
  <BaseContainer>
    <div class="detail-wrapper">
      <div class="title-wrapper">
        <div class="detail-date">{{ updateTime }}</div>
        <div class="detail-title">{{ detail.title }}</div>
      </div>
      <div class="detail-content" v-html="detail.content" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '@/shared/components/BaseContainer';
import dateUtils from '@/shared/intl/utils/dateUtils';
import { fetchGoodNewsDetail } from '@/api';

export default {
  components: {
    BaseContainer,
  },

  async asyncData({ params, redirect }) {
    console.log(params);
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
