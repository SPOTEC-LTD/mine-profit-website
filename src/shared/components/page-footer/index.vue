<template>
  <div class="page-footer">
    <div class="page-footer-container">
      <div class="page-footer-subject">
        <img class="page-footer-vision" src="@/assets/footer-subject.png" alt="" />
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
            :to="{ path: '/newsAnnouncement', query: { type: '2' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('newsletter') }}
          </ALink>
          <ALink
            :to="{ path: '/newsAnnouncement', query: { type: '1' } }"
            :isReload="true"
            class="page-footer-nav-item"
          >
            {{ $t('recommendArticle') }}
          </ALink>
          <ALink
            :to="{ path: '/newsAnnouncement', query: { type: '3' } }"
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
            to="/help"
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
import Link from '@/shared/components/link';
import FacebookFilled from 'ahoney/lib/icons/FacebookFilled';
import TwitterFilled from 'ahoney/lib/icons/TwitterFilled';
import MailFilled from 'ahoney/lib/icons/MailFilled';

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
