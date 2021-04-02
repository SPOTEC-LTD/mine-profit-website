<template>
  <default-layout :with-footer="false" />
</template>

<script>
import DefaultLayout from './default.vue';

export default {
  components: {
    'default-layout': DefaultLayout,
  },
};
</script>
