<template>
  <div class="download">
    <div class="scenario-container" :class="{ [`scenario--${scenarioIndex}`]: true }">
      <div v-if="scenarioIndex === 0" class="main-imgs">
        <img class="img-1" src="@/assets/download/1-1.png" alt="">
        <img class="img-2" src="@/assets/download/1-2.png" alt="">
        <img class="img-3" src="@/assets/download/1-3.png" alt="">
      </div>
      <div v-if="scenarioIndex === 1" class="main-imgs">
        <img class="img-1" src="@/assets/download/2-1.png" alt="">
        <img class="img-2" src="@/assets/download/2-2.png" alt="">
        <img class="img-3" src="@/assets/download/2-3.png" alt="">
      </div>
      <div class="main-content">
        <div v-if="scenarioIndex === 0">
          <div class="text-content">
            <img src="@/assets/download/project.png" alt="">
            <div class="description">
              一样的矿工，不一样的生活
            </div>
          </div>
          <div class="qrcode-container">
            <div class="download-now">
              立即扫码下载
            </div>
            <div class="qrcode">
              <qrcode value="www.google.com" />
            </div>
            <div class="version-ios">
              <img src="@/assets/download/apple.png" alt="">
              <div>
                版本：1.0.1
              </div>
            </div>
            <div class="version-android">
              <img src="@/assets/download/android.png" alt="">
              <div>
                版本：1.0.1
              </div>
            </div>
          </div>
          <div class="glass-1 glass w-172" />
          <div class="square-1 lake-blue w-72" />
          <div class="square-o-1 pomegranate-outlined-square w-90" />
          <div class="square-2 lake-blue w-90" />
          <square-dots-icon class="matrix-1 dot-matrix" />
        </div>
        <div v-if="scenarioIndex === 1">
          <div class="text-content">
            <div class="title">
              算力生态圈，助你获利非凡
            </div>
            <div class="description">
              完善的算力转让、质押生态圈，让你实现灵活的算力资产配置，获得最优收益。
            </div>
          </div>
          <div class="qrcode-container">
            <div class="download-now">
              立即扫码下载
            </div>
            <div class="qrcode">
              <qrcode value="www.google.com" />
            </div>
            <div class="version-ios">
              <img src="@/assets/download/apple.png" alt="">
              <div>
                版本：1.0.1
              </div>
            </div>
            <div class="version-android">
              <img src="@/assets/download/android.png" alt="">
              <div>
                版本：1.0.1
              </div>
            </div>
          </div>
          <div class="square-o-1 pomegranate-outlined-square w-120" />
          <div class="square-1 lake-blue w-90" />
          <square-dots-icon class="matrix-1 dot-matrix" />
          <div class="line-1 lake-blue l4-90" />
        </div>
      </div>
    </div>
    <div class="switch">
      <div
        v-for="(item, index) in 4"
        :key="item"
        class="switch-item"
        :class="{'switch-item--active':index === scenarioIndex}"
      />
    </div>
  </div>
</template>

<script>
import QRcode from '@/shared/components/qrcode';
import SquareDotsIcon from '@/pages/home/square-dots-icon';

export default {
  components: {
    qrcode: QRcode,
    'square-dots-icon': SquareDotsIcon,
  },
  data() {
    return {
      scenarioIndex: 1,
    };
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
