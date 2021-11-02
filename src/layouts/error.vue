<template>
  <div class="container">
    <Page404 v-if="error.statusCode === 404" />
    <Page500 v-else />
  </div>
</template>

<script>
import Page404 from '@/pages/404';
import Page500 from '@/pages/500';

export default {
  components: {
    Page404,
    Page500,
  },

  props: ['error'],
  layout: 'default',
  mounted() {
    console.log('error', this.error);
  },
};
</script>
