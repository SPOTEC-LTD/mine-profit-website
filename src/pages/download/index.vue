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
        <img class="img-4" src="@/assets/download/screen-shot.png" alt="">
      </div>
      <div v-if="scenarioIndex === 2" class="main-imgs">
        <img class="img-1" src="@/assets/download/3-1.png" alt="">
        <img class="img-2" src="@/assets/download/3-2.png" alt="">
        <img class="img-3" src="@/assets/download/3-3.png" alt="">
      </div>
      <div v-if="scenarioIndex === 3" class="main-imgs">
        <img class="img-1" src="@/assets/download/4-1.png" alt="">
        <img class="img-2" src="@/assets/download/4-2.png" alt="">
        <img class="img-3" src="@/assets/download/4-3.png" alt="">
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
        <div v-if="scenarioIndex === 2">
          <div class="text-content">
            <div class="title">
              专业化数据，助你胜券在握
            </div>
            <div class="description">
              专业、即时、易懂的算力数据信息，助你实时了解市场动态，掌握市场机遇。
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
          <square-dots-icon class="matrix-1 dot-matrix" />
          <div class="line-1 lake-blue l4-90" />
          <div class="glass-1 glass w-108" />
          <square-dots-icon class="matrix-2 dot-matrix" />
          <div class="square-o-1 pomegranate-outlined-square w-120" />
          <square-dots-icon class="matrix-3 dot-matrix" />
        </div>
        <div v-if="scenarioIndex === 3">
          <div class="text-content">
            <div class="title">
              一键式操作，助你快速入门
            </div>
            <div class="description">
              便捷的注册、充值、算力购买流程，使你秒获算力，即刻拥有挖矿收益。
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
          <div class="square-1 lake-blue w-90" />
          <div class="glass-1 glass w-108" />
          <div class="square-o-1 pomegranate-outlined-square w-120" />
          <square-dots-icon class="matrix-1 dot-matrix" />
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
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';

export default {
  components: {
    qrcode: QRcode,
    'square-dots-icon': SquareDotsIcon,
  },
  data() {
    return {
      scenarioIndex: 3,
    };
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
