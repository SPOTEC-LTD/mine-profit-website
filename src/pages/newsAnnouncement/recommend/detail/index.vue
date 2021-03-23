<template>
  <base-container>
    <div class="detail-wrapper">
      <div class="detail-top">
        <img class="back-icon" src="@/assets/help/left-arrow.png" alt="" @click="goGoodNews">
        <div>
          <div class="detail-date">
            {{
              dateUtils.formatDateTime(detail.updateTime, "YYYY-MM-DD HH:mm")
            }}
          </div>
          <div class="detail-title">{{ detail.title }}</div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="detail-content" v-html="detail.content" />
      </div>
    </div>
  </base-container>
</template>

<script>
import BaseContainer from '@/shared/components/base-container';
import dateUtils from '@/shared/intl/utils/dateUtils';
import locationServices from '@/shared/services/location/locationServices';
import { fetchGoodNewsDetail } from '@/api';

export default {
  components: {
    'base-container': BaseContainer,
  },
  data() {
    return {
      detail: {},
      dateUtils,
    };
  },
  mounted() {
    fetchGoodNewsDetail({
      pathParams: { id: this.$route.params.id },
    }).then(data => {
      const {
        body: { textInfo },
      } = data;
      this.detail = textInfo;
    });
  },
  methods: {
    goGoodNews() {
      locationServices.push('/newsAnnouncement');
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
