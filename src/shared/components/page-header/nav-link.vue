<template>
  <ALink :to="href">
    <div class="nav-link">
      <div class="nav-link-content">
        <slot />
      </div>
      <img
        class="nav-link-active-mark mark-hidden"
        src="@/assets/active.png"
        alt=""
      />
    </div>
  </ALink>
</template>

<script>
import Link from '@/shared/components/link';

export default {
  name: 'NavLink',

  components: {
    ALink: Link,
  },

  props: ['href'],
};
</script>
