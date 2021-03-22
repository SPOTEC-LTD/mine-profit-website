<template>
  <a-dropdown>
    <a class="nav-menu-trigger" @click="e => e.preventDefault()">
      Hover me <a-icon type="down" />
    </a>
  </a-dropdown>
</template>

<script>
import { Dropdown } from 'ant-design-vue';

export default {
  name: 'NavMenu',
  components: {
    'a-dropdown': Dropdown,
  },
};
</script>

<style scoped>
@import "./nav-menu.less";
</style>
