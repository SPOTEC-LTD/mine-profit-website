<template>
  <div class="test">
    <a-config-provider prefix-cls="mp">
      <Nuxt />
    </a-config-provider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';

export default {
  components: {
    'a-config-provider': ConfigProvider,
  },
  beforeMount() {
    locale.init(this.$i18n);
    dateUtils.locale = this.$i18n.locale;
  },
};
</script>
