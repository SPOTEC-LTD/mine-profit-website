<template>
  <div class="download">
    <div class="scenario-container">
      <div class="main-imgs">
        <transition name="fade-left-img1" mode="out-in">
          <img v-if="isScenario1" class="img-0-1" src="@/assets/download/1-1.png" alt="">
        </transition>
        <transition name="fade-left-img2" mode="out-in">
          <img v-if="isScenario1" class="img-0-2" src="@/assets/download/1-2.png" alt="">
        </transition>
        <transition name="fade-left-img3" mode="out-in">
          <img v-if="isScenario1" class="img-0-3" src="@/assets/download/1-3.png" alt="">
        </transition>
        <transition name="fade-bottom-img1" mode="out-in">
          <img v-if="isScenario2" class="img-1-1" src="@/assets/download/2-2.png" alt="">
        </transition>
        <transition name="fade-bottom-img2" mode="out-in">
          <img v-if="isScenario2" class="img-1-2" src="@/assets/download/2-3.png" alt="">
        </transition>
        <transition name="fade-bottom-img3" mode="out-in">
          <img v-if="isScenario2" class="img-1-3" src="@/assets/download/2-1.png" alt="">
        </transition>
        <transition name="fade-delay" mode="out-in">
          <div v-if="isScenario2" class="img-shadow"></div>
        </transition>
        <transition name="zoom-img4" mode="out-in">
          <img v-if="isScenario2" class="img-1-4" src="@/assets/download/screen-shot.png" alt="">
        </transition>
        <transition name="fade-left-img1" mode="out-in">
          <img v-if="isScenario3" class="img-2-1" src="@/assets/download/3-1.png" alt="">
        </transition>
        <transition name="fade-left-img2" mode="out-in">
          <img v-if="isScenario3" class="img-2-2" src="@/assets/download/3-2.png" alt="">
        </transition>
        <transition name="fade-left-img3" mode="out-in">
          <img v-if="isScenario3" class="img-2-3" src="@/assets/download/3-3.png" alt="">
        </transition>
        <transition name="fade-left-img1" mode="out-in">
          <img v-if="isScenario4" class="img-3-1" src="@/assets/download/4-1.png" alt="">
        </transition>
        <transition name="fade-left-img2" mode="out-in">
          <img v-if="isScenario4" class="img-3-2" src="@/assets/download/4-2.png" alt="">
        </transition>
        <transition name="fade-left-img3" mode="out-in">
          <img v-if="isScenario4" class="img-3-3" src="@/assets/download/4-3.png" alt="">
        </transition>
      </div>

      <div class="main-content">
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario1" class="text-content" :class="{ [`scenario--0`]: isScenario1 }">
            <img src="@/assets/download/project.png" alt="">
            <div class="description">
              一样的矿工，不一样的生活
            </div>
          </div>
        </transition>
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario2" class="text-content">
            <div class="title">
              算力生态圈，助你获利非凡
            </div>
            <div class="description">
              完善的算力转让、质押生态圈，让你实现灵活的算力资产配置，获得最优收益。
            </div>
          </div>
        </transition>
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario3" class="text-content">
            <div class="title">
              专业化数据，助你胜券在握
            </div>
            <div class="description">
              专业、即时、易懂的算力数据信息，助你实时了解市场动态，掌握市场机遇。
            </div>
          </div>
        </transition>
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario4" class="text-content">
            <div class="title">
              一键式操作，助你快速入门
            </div>
            <div class="description">
              便捷的注册、充值、算力购买流程，使你秒获算力，即刻拥有挖矿收益。
            </div>
          </div>
        </transition>

        <div class="qrcode-container">
          <div class="download-now">
            立即扫码下载
          </div>
          <div class="qrcode">
            <!-- FIXME update value to correct URL and version -->
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

        <transition name="glass-fade-left-rotate" mode="out-in">
          <div v-if="isScenario1" class="glass-0-1 glass w-172" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario1" class="square-0-1 lake-blue w-72" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario1" class="square-o-0-1 pomegranate-outlined-square w-90" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario1" class="square-0-2 lake-blue w-90" />
        </transition>
        <transition name="fade" mode="out-in">
          <square-dots-icon v-if="isScenario1" class="matrix-0-1 dot-matrix" />
        </transition>

        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario2" class="square-o-1-1 pomegranate-outlined-square w-120" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario2" class="square-1-1 lake-blue w-90" />
        </transition>
        <transition name="fade" mode="out-in">
          <square-dots-icon v-if="isScenario2" class="matrix-1-1 dot-matrix" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario2" class="line-1-1 lake-blue l4-90" />
        </transition>

        <transition name="fade" mode="out-in">
          <square-dots-icon v-if="isScenario3" class="matrix-2-1 dot-matrix" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario3" class="line-2-1 lake-blue l4-90" />
        </transition>
        <transition name="glass-fade-left-rotate" mode="out-in">
          <div v-if="isScenario3" class="glass-2-1 glass w-108" />
        </transition>
        <transition name="fade" mode="out-in">
          <square-dots-icon v-if="isScenario3" class="matrix-2-2 dot-matrix" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario3" class="square-o-2-1 pomegranate-outlined-square w-120" />
        </transition>
        <transition name="fade" mode="out-in">
          <square-dots-icon v-if="isScenario3" class="matrix-2-3 dot-matrix" />
        </transition>

        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario4" class="square-3-1 lake-blue w-90" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario4" class="glass-3-1 glass w-108" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario4" class="square-o-3-1 pomegranate-outlined-square w-120" />
        </transition>
        <transition name="fade" mode="out-in">
          <square-dots-icon v-if="isScenario4" class="matrix-3-1 dot-matrix" />
        </transition>
      </div>
    </div>
    <div class="switch">
      <!-- FIXME confirm switch method: automatic, click or scroll -->
      <div
        v-for="(item, index) in 4"
        :key="item"
        class="switch-item"
        :class="{ 'switch-item--active': index === scenarioIndex }"
        @click="switchToScenario(index)"
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
      scenarioIndex: 0,
    };
  },
  computed: {
    isScenario1() {
      return this.scenarioIndex === 0;
    },
    isScenario2() {
      return this.scenarioIndex === 1;
    },
    isScenario3() {
      return this.scenarioIndex === 2;
    },
    isScenario4() {
      return this.scenarioIndex === 3;
    },
  },
  methods: {
    switchToScenario(nextScenarioIndex) {
      this.scenarioIndex = nextScenarioIndex;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
@import "./animation.less";
</style>
