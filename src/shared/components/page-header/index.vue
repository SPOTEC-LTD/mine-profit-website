<template>
  <div class="page-header">
    <div class="page-header-container">
      <ALink to="/">
        <img class="page-header-logo" src="~/assets/logo-black.png" alt="MINE PROFIT" />
      </ALink>
      <div class="page-header-nav">
        <NavLink href="/">{{ $t('home') }}</NavLink>
        <NavLink href="/ecosphere">{{ $t('ecosphere') }}</NavLink>
        <NavMenu href-prefix="/newsAnnouncement" :items="items">{{ $t('newsAnnouncement') }}</NavMenu>
        <NavLink href="/help">{{ $t('helpCenter') }}</NavLink>
        <LanguageMenu :items="languageItems">{{ $t('language') }}</LanguageMenu>
        <Button class="page-header-download" type="primary" @click="redirectToDownloadGuidePage">
          {{ $t('downloadNow') }}
        </Button>
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
import { I18N } from '@/shared/intl/i18n';
import Link from '@/shared/components/link';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import NavLink from './nav-link.vue';
import NavMenu from './nav-menu.jsx';
import LanguageMenu from './language-menu.jsx';

export default {
  components: {
    Button,
    NavLink,
    NavMenu,
    LanguageMenu,
    ALink: Link,
  },
  data() {
    return {
      items: [
        {
          href: '/newsAnnouncement',
          name: this.$t('recommendArticle'),
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: '/newsAnnouncement',
          hidden: !getIsChinese(),
          name: this.$t('newsletter'),
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
        {
          href: '/newsAnnouncement',
          name: this.$t('announcement'),
          type: ANNOUNCEMENT,
          description: this.$t('announcementDesc'),
          icon: <TipCirccleOutlined />,
        },
      ],
      languageItems: I18N.locales,
    };
  },
  methods: {
    redirectToDownloadGuidePage() {
      locationServices.push('/download');
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
