<template>
  <default-layout :with-footer="false" :overflowx-hidden="true" />
</template>

<script>
import DefaultLayout from './default.vue';

export default {
  components: {
    'default-layout': DefaultLayout,
  },
};
</script>
