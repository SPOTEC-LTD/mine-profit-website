<template>
  <div class="page-header">
    <div class="page-header-container">
      <img class="page-header-logo" src="~/assets/logo-black.png" alt="MINE PROFIT">
      <div class="page-header-nav">
        <nav-link href="/">首页</nav-link>
        <nav-menu href-prefix="/newsAnnouncement" :items="items">资讯公告</nav-menu>
        <nav-link href="/help">帮助中心</nav-link>
        <a-button class="page-header-download" type="primary">立即下载</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import DocFilledOutlined from 'ahoney/lib/icons/DocFilledOutlined';
import EmailCircleOutlined from 'ahoney/lib/icons/EmailCircleOutlined';
import TipCirccleOutlined from 'ahoney/lib/icons/TipCirccleOutlined';
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
          name: '好文',
          type: RECOMMEND,
          description: '深度了解行业与相关背景',
          icon: <DocFilledOutlined />,
        },
        {
          href: '/newsAnnouncement?type=2',
          name: '快讯',
          type: NEWSLETTER,
          description: '实时快速的一手资讯',
          icon: <EmailCircleOutlined />,
        },
        {
          href: '/newsAnnouncement?type=3',
          name: '公告',
          type: ANNOUNCEMENT,
          description: '了解官方发布的实时公告',
          icon: <TipCirccleOutlined />,
        },
      ],
    };
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
