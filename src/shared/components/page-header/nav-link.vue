<template>
  <c-link :to="href">
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

  props: ['href', 'isNavActivated'],

  computed: {
    isActive() {
      if (this.isNavActivated) {
        return this.isNavActivated(this.href, this.$route.path);
      }
      return this.href === this.$route.path;
    },
  },
};
</script>

<style lang="less">
@import './nav-link.less';
</style>
