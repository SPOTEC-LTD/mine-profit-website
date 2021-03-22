<template>
  <c-link :to="path">
    <div class="nav-link" v-bind:class="{ 'nav-link--active': isActive }">
      <div class="nav-link-content">
        <slot />
      </div>
      <img
        v-if="isActive"
        class="nav-link-active-mark"
        src="@/assets/active.png"
        alt=""
      />
    </div>
  </c-link>
</template>

<script>
import Link from '@/shared/components/link';

export default {
  name: 'NavLink',

  components: {
    'c-link': Link,
  },

  props: ['path', 'isNavActivated'],

  computed: {
    isActive() {
      if (this.isNavActivated) {
        return this.isNavActivated(this.path, this.$route.path);
      }
      return this.path === this.$route.path;
    },
  },
};
</script>

<style>
@import './nav-link.less';
</style>
