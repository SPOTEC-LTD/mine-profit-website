<template>
  <div class="page-header">
    <div class="page-header-container">
      <a href="/">
        <img class="page-header-logo" src="~/assets/logo-black.png" alt="MINE PROFIT">
      </a>
      <div class="page-header-nav">
        <nav-link href="/">{{ $t('home') }}</nav-link>
        <nav-menu href-prefix="/newsAnnouncement" :items="items">{{ $t('newsAnnouncement') }}</nav-menu>
        <nav-link href="/help">{{ $t('helpCenter') }}</nav-link>
        <a-button class="page-header-download" type="primary" @click="redirectToDownloadGuidePage">
          {{ $t('downloadNow') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import DocFilledOutlined from 'ahoney/lib/icons/DocFilledOutlined';
import EmailCircleOutlined from 'ahoney/lib/icons/EmailCircleOutlined';
import TipCirccleOutlined from 'ahoney/lib/icons/TipCirccleOutlined';
import locationServices from '@/shared/services/location/locationServices';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';

import NavLink from './nav-link.vue';
import NavMenu from './nav-menu.jsx';

export default {
  components: {
    'a-button': Button,
    'nav-link': NavLink,
    'nav-menu': NavMenu,
  },
  data() {
    return {
      items: [
        {
          href: '/newsAnnouncement?type=1',
          name: this.$t('recommendArticle'),
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: '/newsAnnouncement?type=2',
          name: this.$t('newsletter'),
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
        {
          href: '/newsAnnouncement?type=3',
          name: this.$t('announcement'),
          type: ANNOUNCEMENT,
          description: this.$t('announcementDesc'),
          icon: <TipCirccleOutlined />,
        },
      ],
    };
  },
  methods: {
    redirectToDownloadGuidePage() {
      locationServices.push('/download');
    }
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
