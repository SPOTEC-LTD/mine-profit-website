<template>
  <a-config-provider prefix-cls="mp">
    <div>
      <page-header />
      <Nuxt />
      <page-footer />
    </div>
  </a-config-provider>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import PageHeader from '@/shared/components/page-header';
import PageFooter from '@/shared/components/page-footer';
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';

export default {
  components: {
    'a-config-provider': ConfigProvider,
    'page-header': PageHeader,
    'page-footer': PageFooter,
  },
  beforeMount() {
    locale.init(this.$i18n);
    dateUtils.locale = this.$i18n.locale;
  },
};
</script>

<style>
@import "~@/shared/styles/index.less";
</style>
