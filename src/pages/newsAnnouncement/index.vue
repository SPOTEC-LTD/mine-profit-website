<template>
  <base-container>
    <a-tabs destroy-inactive-tab-pane :default-active-key="active" @change="callback">
      <a-tab-pane :key="RECOMMEND" :tab="$t('recommendArticle')">
        <m-recommend />
      </a-tab-pane>
      <a-tab-pane :key="NEWSLETTER" :tab="$t('newsletter')">
        <m-newsletter />
      </a-tab-pane>
      <a-tab-pane :key="ANNOUNCEMENT" :tab="$t('announcement')">
        <m-announcement />
      </a-tab-pane>
    </a-tabs>
  </base-container>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import BaseContainer from '@/shared/components/base-container';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';
import Recommend from './recommend/index.vue';
import Newsletter from './newsletter/index.vue';
import Announcement from './announcement/index.vue';

const { TabPane } = Tabs;

export default {
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': TabPane,
    'm-recommend': Recommend,
    'base-container': BaseContainer,
    'm-newsletter': Newsletter,
    'm-announcement': Announcement,
  },
  data() {
    return {
      RECOMMEND,
      NEWSLETTER,
      ANNOUNCEMENT,
      active: this.$route.query.type || RECOMMEND,
    };
  },
  mounted() {
    this.$router.push({ query: { ...this.$route.query, type: this.$route.query.type || RECOMMEND } });
  },
  methods: {
    callback(key) {
      this.$router.push({ query: { ...this.$route.query, type: key } });
    },
  },
};
</script>

<style lang='less' scoped>
  @import "./index.less";
</style>
