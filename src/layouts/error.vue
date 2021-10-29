<template>
  <div class="container">
    <Page404 v-if="error.statusCode === 404" />
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
import Page404 from '@/pages/404';

export default {
  components: {
    Page404,
  },

  props: ['error'],
  layout: 'default',
  mounted() {
    console.log('error', this.error);
  },
};
</script>
