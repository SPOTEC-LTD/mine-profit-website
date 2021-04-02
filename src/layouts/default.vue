<template>
  <a-config-provider prefix-cls="mp">
    <div>
      <page-header />
      <a-modal
        title="Title"
        :visible="false"
      >
        <p>asdfasfasdf</p>
      </a-modal>
      <div class="layout" :style="{'overflow-x': overflowxHidden ? 'auto' : 'hidden'}">
        <Nuxt />
      </div>
      <page-footer v-if="withFooter" />
    </div>
  </a-config-provider>
</template>

<script>
import { ConfigProvider, Modal } from 'ant-design-vue';
import PageHeader from '@/shared/components/page-header';
import PageFooter from '@/shared/components/page-footer';
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';
// import 'ant-design-vue/lib/modal/style/index';

export default {
  components: {
    'a-config-provider': ConfigProvider,
    'page-header': PageHeader,
    'page-footer': PageFooter,
    'a-modal': Modal,
  },
  props: {
    overflowxHidden: {
      type: Boolean,
      default: false,
    },
    withFooter: {
      type: Boolean,
      default: true,
    },
  },
  beforeMount() {
    locale.init(this.$i18n);
    dateUtils.locale = this.$i18n.locale;
  },
};
</script>

<style>
@import "~@/shared/styles/index.less";
@import "./default.less";
</style>
