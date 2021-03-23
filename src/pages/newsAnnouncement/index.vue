<template>
  <base-container>
    <a-tabs destroy-inactive-tab-pane default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="好文">
        <m-recommend />
      </a-tab-pane>
      <a-tab-pane key="2" tab="快讯">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="公告"> Content of Tab Pane 3 </a-tab-pane>
    </a-tabs>
  </base-container>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import BaseContainer from '@/shared/components/base-container';
import Recommend from './recommend';

const { TabPane } = Tabs;

export default {
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': TabPane,
    'm-recommend': Recommend,
    'base-container': BaseContainer,
  },
  data() {
    return {};
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>

<style lang='less' scoped>
  @import "./index.less";
</style>
