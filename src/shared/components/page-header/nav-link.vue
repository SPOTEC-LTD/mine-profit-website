<template>
  <c-link :to="href">
    <div class="nav-link">
      <div class="nav-link-content">
        <slot />
      </div>
      <img
        class="nav-link-active-mark mark-hidden"
        src="@/assets/active.png"
        alt=""
      >
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

  props: ['href'],
};
</script>
