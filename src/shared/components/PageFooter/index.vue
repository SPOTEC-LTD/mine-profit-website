<template>
  <div class="page-footer">
    <div class="page-footer-container">
      <div class="page-footer-subject">
        <img v-if="!isEnLanguage" class="page-footer-vision" src="@/assets/footer-subject.png" alt="" />
        <img v-if="isEnLanguage" class="en-page-footer-vision" src="@/assets/en-footer-subject.png" alt="" />
        <div class="page-footer-social">
          <div class="page-footer-social-content">
            <a v-if="socialData.twitter" class="page-footer-icon" :href="socialData.twitter" target="_blank">
              <TwitterFilled />
            </a>
            <a v-if="socialData.facebook" class="page-footer-icon" :href="socialData.facebook" target="_blank">
              <FacebookFilled />
            </a>
            <div v-if="socialData.email" class="page-footer-email">
              <a class="page-footer-icon"><MailFilled /></a>
              <a :href="`mailto:${socialData.email}`" class="email-address">Email:{{ socialData.email }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="page-footer-navs">
        <div>
          <div class="page-footer-nav-category">
            {{ $t('information') }}
          </div>
          <ALink
            :to="{ path: newsAnnouncementPath, query: { type: '2' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('newsletter') }}
          </ALink>
          <ALink
            :to="{ path: newsAnnouncementPath, query: { type: '1' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('recommendArticle') }}
          </ALink>
          <ALink
            :to="{ path: newsAnnouncementPath, query: { type: '3' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('announcement') }}
          </ALink>
        </div>
        <div>
          <div class="page-footer-nav-category">
            {{ $t('support') }}
          </div>
          <ALink
            :to="helpPath"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('helpCenter') }}
          </ALink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchBizSocialInfo } from '@/api';
import FacebookFilled from 'ahoney/lib/icons/FacebookFilled';
import TwitterFilled from 'ahoney/lib/icons/TwitterFilled';
import MailFilled from 'ahoney/lib/icons/MailFilled';
import Link from '@/shared/components/Link';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import { newsAnnouncementPath, helpPath } from '@/router/consts/urls';

export default {
  components: {
    ALink: Link,
    FacebookFilled,
    TwitterFilled,
    MailFilled,
  },

  data() {
    return {
      socialData: {},
      isEnLanguage: getIsEnglish(),
      newsAnnouncementPath,
      helpPath,
    };
  },

  mounted() {
    this.fetchBizSocialData();
  },

  methods: {
    fetchBizSocialData() {
      fetchBizSocialInfo().then(data => {
        const { body: { otherSettings } } = data;
        this.socialData = otherSettings;
      });
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
