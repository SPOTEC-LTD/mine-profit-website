<template>
  <div class="vision-item">
    <span class="vision-title">{{ $t('ourMission') }}</span>
    <span class="vision-content">{{ content }}</span>
  </div>
</template>

<script>

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
