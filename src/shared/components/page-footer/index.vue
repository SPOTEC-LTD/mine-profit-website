<template>
  <div class="page-footer">
    <div class="page-footer-container">
      <div class="page-footer-subject">
        <img class="page-footer-vision" src="@/assets/footer-subject.png" alt="">
        <div class="page-footer-powered">
          Powered by
        </div>
        <div class="page-footer-project">
          Mineprofit
        </div>
      </div>
      <div class="page-footer-navs">
        <div>
          <div class="page-footer-nav-category">
            {{ $t('information') }}
          </div>
          <a-link
            :to="{ path: '/newsAnnouncement', query: { type: '2' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('newsletter') }}
          </a-link>
          <a-link
            :to="{ path: '/newsAnnouncement', query: { type: '1' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('recommendArticle') }}
          </a-link>
          <a-link
            :to="{ path: '/newsAnnouncement', query: { type: '3' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('announcement') }}
          </a-link>
        </div>
        <div>
          <div class="page-footer-nav-category">
            {{ $t('support') }}
          </div>
          <a-link
            to="/help"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('helpCenter') }}
          </a-link>
        </div>
        <!-- <div>
          <div class="page-footer-nav-category">
            {{ $t('businessCooperation') }}
          </div>
          <a href="#" class="page-footer-nav-item">
            {{ $t('contactUs') }}
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Link from '@/shared/components/link';

export default {
  components: {
    'a-link': Link,
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
