<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';

export default {
  beforeMount() {
    locale.init(this.$i18n);
    dateUtils.locale = this.$i18n.locale;
  },
};
</script>
