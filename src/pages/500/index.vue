<template>
  <div class="meet-error">
    <img src="@/assets/svg/500.svg" alt="MEET ERROR - 500">
    <div class="hint">
      {{ $t('sorryPageMeetsError') }}
    </div>
    <a-button class="back" type="primary" size="large" @click="forwardHome">
      {{ $t('backHome') }}
    </a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import locationServices from '@/shared/services/location/locationServices';

export default {
  components: {
    'a-button': Button,
  },

  methods: {
    forwardHome() {
      locationServices.push('/');
    },
  },
};
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
