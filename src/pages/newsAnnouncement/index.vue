<template>
  <BaseContainer>
    <Tabs destroyInactiveTabPane :defaultActiveKey="active" @change="callback">
      <TabPane :key="RECOMMEND" :tab="$t('recommendArticle')">
        <Recommend />
      </TabPane>
      <TabPane :key="NEWSLETTER" :tab="$t('newsletter')">
        <Newsletter />
      </TabPane>
      <TabPane :key="ANNOUNCEMENT" :tab="$t('announcement')">
        <Announcement />
      </TabPane>
    </Tabs>
  </BaseContainer>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import BaseContainer from '@/shared/components/BaseContainer';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';
import Recommend from './Recommend/index.vue';
import Newsletter from './Newsletter/index.vue';
import Announcement from './Announcement/index.vue';

const { TabPane } = Tabs;

export default {
  components: {
    Tabs,
    TabPane,
    Recommend,
    BaseContainer,
    Newsletter,
    Announcement,
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
