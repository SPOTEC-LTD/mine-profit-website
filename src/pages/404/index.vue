<template>
  <div class="not-found">
    <img src="@/assets/svg/404.svg" alt="NOT FOUND - 404" />
    <div class="hint">
      {{ $t('sorryPageNotFound') }}
    </div>
    <Button class="back" type="primary" size="large" @click="forwardHome">
      {{ $t('backHome') }}
    </Button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import locationServices from '@/shared/services/location/locationServices';

export default {
  components: {
    Button,
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
