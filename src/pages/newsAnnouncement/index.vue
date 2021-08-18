<template>
  <BaseContainer>
    <KeepTabs class="mine-tabs-line" activeKeyName="type" :value="active" @change="onTabsChange">
      <TabPane :key="RECOMMEND" :tab="$t('recommendArticle')">
        <Recommend v-if="active === RECOMMEND" />
      </TabPane>
      <TabPane :key="NEWSLETTER" :tab="$t('newsletter')">
        <Newsletter v-if="active === NEWSLETTER" />
      </TabPane>
      <TabPane :key="ANNOUNCEMENT" :tab="$t('announcement')">
        <Announcement v-if="active === ANNOUNCEMENT" />
      </TabPane>
    </KeepTabs>
  </BaseContainer>
</template>

<script>
import KeepTabs from '@/shared/components/KeepTabs';
import BaseContainer from '@/shared/components/BaseContainer';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';
import Recommend from './Recommend/index.vue';
import Newsletter from './Newsletter/index.vue';
import Announcement from './Announcement/index.vue';

const { TabPane } = KeepTabs;

export default {
  components: {
    TabPane,
    Recommend,
    BaseContainer,
    Newsletter,
    Announcement,
    KeepTabs,
  },
  data() {
    return {
      RECOMMEND,
      NEWSLETTER,
      ANNOUNCEMENT,
      active: this.$route.query.type || RECOMMEND,
    };
  },

  methods: {
    onTabsChange(newKey) {
      this.active = newKey;
    },
  },
};
</script>
