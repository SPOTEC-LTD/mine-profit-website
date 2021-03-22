<template>
  <div class="page-header">
    <div class="page-header-container">
      <img class="page-header-logo" src="~/assets/logo-white.png" alt="MINE PROFIT">
      <div class="page-header-nav">
        <nav-link path="/">首页</nav-link>
        <nav-link path="/">咨询公告</nav-link>
        <nav-link path="/support">帮助中心</nav-link>
        <a-button class="page-header-download" type="primary">立即下载</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import NavLink from './nav-link.vue';

export default {
  components: {
    'a-button': Button,
    'nav-link': NavLink,
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
