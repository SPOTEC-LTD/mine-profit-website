<template>
  <div class="map-container">
    <img class="cooperation-map-img" src="@/assets/home/map.png" alt="">
    <img class="map-china" src="@/assets/home/mapChina.png" alt="">
    <img class="map-canada" src="@/assets/home/mapCanada.png" alt="">
    <!-- <img class="map-georgia" src="@/assets/home/mapGeorgia.png" alt="">
    <img class="map-kazakhstan" src="@/assets/home/mapKazakhstan.png" alt="">
    <img class="map-uzbekistan" src="@/assets/home/mapUzbekistan.png" alt=""> -->
  </div>
</template>

<script>

import cooperationTitleImage from '@/assets/home/cooperation-company.png';

export default {
  components: {

  },

  data() {
    return {
      cooperationTitleImage,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
