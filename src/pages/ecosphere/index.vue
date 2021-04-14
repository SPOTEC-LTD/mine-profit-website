<template>
  <div>
    <base-container class="background-container">
      <div>
        待开发
      </div>
    </base-container>
    <base-container>
      <cooperation-partner />
    </base-container>
  </div>
</template>

<script>
import BaseContainer from '@/shared/components/base-container';
import cooperationPartner from '@/pages/ecosphere/cooperation-partner';

export default {
  components: {
    'base-container': BaseContainer,
    'cooperation-partner': cooperationPartner,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
