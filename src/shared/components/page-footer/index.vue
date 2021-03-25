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
          <a href="/newsAnnouncement?type=2" class="page-footer-nav-item">
            {{ $t('newsletter') }}
          </a>
          <a href="/newsAnnouncement?type=1" class="page-footer-nav-item">
            {{ $t('recommendArticle') }}
          </a>
          <a href="/newsAnnouncement?type=3" class="page-footer-nav-item">
            {{ $t('announcement') }}
          </a>
        </div>
        <div>
          <div class="page-footer-nav-category">
            {{ $t('support') }}
          </div>
          <a href="/help" class="page-footer-nav-item">
            {{ $t('helpCenter') }}
          </a>
        </div>
        <div>
          <div class="page-footer-nav-category">
            {{ $t('businessCooperation') }}
          </div>
          <a href="#" class="page-footer-nav-item">
            {{ $t('contactUs') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "./index.less";
</style>
