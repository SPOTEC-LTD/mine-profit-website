<template>
  <div class="download">
    <div class="scenario-container">
      <div class="main-imgs">
        <transition name="fade-left-img1" mode="out-in">
          <img v-if="isEnLanguage && isScenario1" class="img-0-1" src="@/assets/download/en-1-1.png" alt="" />
          <img v-if="!isEnLanguage && isScenario1" class="img-0-1" src="@/assets/download/1-1.png" alt="" />
        </transition>
        <transition name="fade-left-img2" mode="out-in">
          <img v-if="isEnLanguage && isScenario1" class="img-0-2" src="@/assets/download/en-1-2.png" alt="" />
          <img v-if="!isEnLanguage && isScenario1" class="img-0-2" src="@/assets/download/1-2.png" alt="" />
        </transition>
        <transition name="fade-left-img3" mode="out-in" @afterEnter="setAnimationCompleted">
          <img v-if="isEnLanguage && isScenario1" class="img-0-3" src="@/assets/download/en-1-3.png" alt="" />
          <img v-if="!isEnLanguage && isScenario1" class="img-0-3" src="@/assets/download/1-3.png" alt="" />
        </transition>
        <transition name="fade-bottom-img1" mode="out-in">
          <img v-if="isEnLanguage && isScenario2" class="img-1-1" src="@/assets/download/en-2-2.png" alt="" />
          <img v-if="!isEnLanguage && isScenario2" class="img-1-1" src="@/assets/download/2-2.png" alt="" />
        </transition>
        <transition name="fade-bottom-img2" mode="out-in">
          <img v-if="isEnLanguage && isScenario2" class="img-1-2" src="@/assets/download/en-2-3.png" alt="" />
          <img v-if="!isEnLanguage && isScenario2" class="img-1-2" src="@/assets/download/2-3.png" alt="" />
        </transition>
        <transition name="fade-bottom-img3" mode="out-in">
          <img v-if="isEnLanguage && isScenario2" class="img-1-3" src="@/assets/download/en-2-1.png" alt="" />
          <img v-if="!isEnLanguage && isScenario2" class="img-1-3" src="@/assets/download/2-1.png" alt="" />
        </transition>
        <transition name="fade-delay" mode="out-in">
          <div v-if="isScenario2" class="img-shadow" />
        </transition>
        <transition name="zoom-img4" mode="out-in" @afterEnter="setAnimationCompleted">
          <img v-if="isEnLanguage && isScenario2" class="img-1-4" src="@/assets/download/en-screen-shot.png" alt="" />
          <img v-if="!isEnLanguage && isScenario2" class="img-1-4" src="@/assets/download/screen-shot.png" alt="" />
        </transition>
        <transition name="fade-bottom-rotate-img1" mode="out-in">
          <img v-if="isEnLanguage && isScenario3" class="img-2-1" src="@/assets/download/en-3-1.png" alt="" />
          <img v-if="!isEnLanguage && isScenario3" class="img-2-1" src="@/assets/download/3-1.png" alt="" />
        </transition>
        <transition name="fade-bottom-rotate-img2" mode="out-in">
          <img v-if="isEnLanguage && isScenario3" class="img-2-2" src="@/assets/download/en-3-2.png" alt="" />
          <img v-if="!isEnLanguage && isScenario3" class="img-2-2" src="@/assets/download/3-2.png" alt="" />
        </transition>
        <transition name="fade-bottom-rotate-img3" mode="out-in" @afterEnter="setAnimationCompleted">
          <img v-if="isEnLanguage && isScenario3" class="img-2-3" src="@/assets/download/en-3-3.png" alt="" />
          <img v-if="!isEnLanguage && isScenario3" class="img-2-3" src="@/assets/download/3-3.png" alt="" />
        </transition>
        <transition name="fade-left-img1" mode="out-in">
          <img v-if="isEnLanguage && isScenario4" class="img-3-1" src="@/assets/download/en-4-1.png" alt="" />
          <img v-if="!isEnLanguage && isScenario4" class="img-3-1" src="@/assets/download/4-1.png" alt="" />
        </transition>
        <transition name="fade-left-img2" mode="out-in">
          <img v-if="isEnLanguage && isScenario4" class="img-3-2" src="@/assets/download/en-4-2.png" alt="" />
          <img v-if="!isEnLanguage && isScenario4" class="img-3-2" src="@/assets/download/4-2.png" alt="" />
        </transition>
        <transition name="fade-left-img3" mode="out-in" @afterEnter="setAnimationCompleted">
          <img v-if="isEnLanguage && isScenario4" class="img-3-3" src="@/assets/download/en-4-3.png" alt="" />
          <img v-if="!isEnLanguage && isScenario4" class="img-3-3" src="@/assets/download/4-3.png" alt="" />
        </transition>
      </div>

      <div class="main-content">
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario1" class="text-content" :class="{ [`scenario--0`]: isScenario1 }">
            <img src="@/assets/download/project.png" alt="" />
            <div class="description">
              {{ $t('downloadDesc1') }}
            </div>
          </div>
        </transition>
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario2" class="text-content" :class="{ ['en-text-content']: isEnLanguage }">
            <div class="title" :class="{ ['en-title']: isEnLanguage }">
              {{ $t('downloadTitle2') }}
            </div>
            <div :class="{ ['en-description']: isEnLanguage }" class="description">
              {{ $t('downloadDesc2') }}
            </div>
          </div>
        </transition>
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario3" class="text-content" :class="{ ['en-text-content']: isEnLanguage }">
            <div class="title" :class="{ ['en-title']: isEnLanguage }">
              {{ $t('downloadTitle3') }}
            </div>
            <div :class="{ ['en-description']: isEnLanguage }" class="description">
              {{ $t('downloadDesc3') }}
            </div>
          </div>
        </transition>
        <transition name="fade-down" mode="out-in">
          <div v-if="isScenario4" class="text-content" :class="{ ['en-text-content']: isEnLanguage }">
            <div class="title" :class="{ ['en-title']: isEnLanguage }">
              {{ $t('downloadTitle4') }}
            </div>
            <div :class="{ ['en-description']: isEnLanguage }" class="description">
              {{ $t('downloadDesc4') }}
            </div>
          </div>
        </transition>

        <div class="qrcode-container">
          <div class="qrcode-content">
            <div class="download-now">
              {{ $t('downloadByScanningQRCode') }}
            </div>
            <div class="qrcode">
              <QRCodeModule :value="`${mobileSiteHost}/download/pre-dispatch?locale=${nowLanguage}`" />
            </div>
            <div class="version-info">
              <div class="version-ios">
                <img src="@/assets/download/apple.png" alt="" />
                <div>{{ $t('appVersion') }} {{ iosVersion }}</div>
              </div>
              <div class="version-android">
                <img src="@/assets/download/android.png" alt="" />
                <div>{{ $t('appVersion') }} {{ androidVersion }}</div>
              </div>
            </div>
          </div>
          <GlassSquare :class="'qrcode-background'" />
        </div>

        <transition name="glass-fade-left-rotate" mode="out-in">
          <GlassSquare v-if="isScenario1" class="glass-0-1 w-172" />
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
          <SquareDotsIcon v-if="isScenario1" class="matrix-0-1 dot-matrix" />
        </transition>

        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario2" class="square-o-1-1 pomegranate-outlined-square w-120" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario2" class="square-1-1 lake-blue w-90" />
        </transition>
        <transition name="fade" mode="out-in">
          <SquareDotsIcon v-if="isScenario2" class="matrix-1-1 dot-matrix" />
        </transition>
        <transition name="fade-left" mode="out-in">
          <div v-if="isScenario2" class="line-1-1 lake-blue l4-90" />
        </transition>

        <transition name="fade" mode="out-in">
          <SquareDotsIcon v-if="isScenario3" class="matrix-2-1 dot-matrix" />
        </transition>
        <transition name="fade-left" mode="out-in">
          <div v-if="isScenario3" class="line-2-1 lake-blue l4-90" />
        </transition>
        <transition name="glass-fade-left-rotate" mode="out-in">
          <GlassSquare v-if="isScenario3" class="glass-2-1 w-108" />
        </transition>
        <transition name="fade" mode="out-in">
          <SquareDotsIcon v-if="isScenario3" class="matrix-2-2 dot-matrix" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario3" class="square-o-2-1 pomegranate-outlined-square w-120" />
        </transition>
        <transition name="fade" mode="out-in">
          <SquareDotsIcon v-if="isScenario3" class="matrix-2-3 dot-matrix" />
        </transition>

        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario4" class="square-3-1 lake-blue w-90" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <GlassSquare v-if="isScenario4" class="glass-3-1 w-108" />
        </transition>
        <transition name="fade-left-rotate" mode="out-in">
          <div v-if="isScenario4" class="square-o-3-1 pomegranate-outlined-square w-120" />
        </transition>
        <transition name="fade" mode="out-in">
          <SquareDotsIcon v-if="isScenario4" class="matrix-3-1 dot-matrix" />
        </transition>
      </div>
    </div>
    <div class="switch">
      <div
        v-for="(item, index) in 4"
        :key="item"
        class="switch-item"
        :class="{ 'switch-item--active': index === scenarioIndex, 'switch-item--waiting': isAnimating }"
        @click="switchToScenario(index)"
      />
    </div>
  </div>
</template>

<script>
import { fetchAppVersion } from '@/api';

import QRCodeModule from '@/shared/components/QRCodeModule';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsEnglish, getLocalLanguage } from '@/shared/utils/getLocalLanguage';

import GlassSquare from './GlassSquare.vue';

export default {
  layout: 'no-footer-layout',
  components: {
    QRCodeModule,
    GlassSquare,
    SquareDotsIcon,
  },

  async asyncData() {
    try {
      const { body: { android, iOS } } = await fetchAppVersion();
      const androidVersion = android.version;
      const iosVersion = iOS.version;
      return {
        androidVersion,
        iosVersion,
      };
    } catch (error) {
      console.log('error', error);
    }
    return {};
  },

  data() {
    return {
      isAnimating: false,
      timeoutId: -1,
      scenarioIndex: 0,
      iosVersion: '',
      androidVersion: '',
      mobileSiteHost: process.env.MOBILE_SITE_HOST,
      isEnLanguage: getIsEnglish(),
      nowLanguage: getLocalLanguage(),
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

  mounted() {
    this.registerToSwitchScenarioAutomatically();
  },

  methods: {
    registerToSwitchScenarioAutomatically() {
      if (this.timeoutId > 0) {
        clearTimeout(this.timeoutId);
      }
      const that = this;
      this.timeoutId = setTimeout(() => {
        that.switchToNextScenario(false);
      }, 6500);
    },
    switchToScenario(nextScenarioIndex) {
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.scenarioIndex = nextScenarioIndex;
        this.registerToSwitchScenarioAutomatically();
      }
    },
    switchToNextScenario() {
      let nextScenarioIndex = this.scenarioIndex + 1;
      if (nextScenarioIndex === 4) {
        nextScenarioIndex = 0;
      }
      this.isAnimating = true;
      this.scenarioIndex = nextScenarioIndex;
      this.registerToSwitchScenarioAutomatically();
    },
    setAnimationCompleted() {
      this.isAnimating = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
@import "./animation.less";
</style>
