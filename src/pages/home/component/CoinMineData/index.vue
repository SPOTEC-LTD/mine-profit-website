<template>
  <div :class="[className, 'coin-data']">
    <div class="coin-title">
      <div class="name-icon">
        <img :src="img" alt="" />
        <span>{{ title }}</span>
      </div>

      <div class="now-hash-rate">
        <span>{{ $t('nowHashRate') }}</span>
        <div>
          <span class="now-number">{{ nowHashRate }}</span>
        </div>
      </div>
    </div>

    <div class="coin-content">
      <span>{{ $t('yesterdayProducer') }}</span>
      <div class="different-produce">
        <div class="self-produce">
          <span>{{ coinProduce }}</span>
          <span class="unit">{{ title }}</span>
        </div>
        <span class="usdt-producer">≈{{ usdtProduce }}USDT</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    nowHashRate: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    coinProduce: {
      type: String,
      default: '',
    },
    usdtProduce: {
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
