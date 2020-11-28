<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
  import Locale from '@/shared/intl/utils/locale';
  import dateUtils from '@/shared/intl/utils/dateUtils';

  export default {
    beforeMount(){
      new Locale(this.$i18n)
      dateUtils.locale = this.$i18n.locale;
    },
  }
</script>
