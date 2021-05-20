<template>
  <base-container class="banner">
    <div>
      <span class="red">test</span>
      <span>{{ $t("searchInputPlaceholder", { msg: 'hello2323' }) }}</span>
      <a-button type="primary"> Primary </a-button>
      <a-input v-model="name" />
      <div>{{ name }}</div>

      age: <a-input v-model="age" />
      <div>{{ age }}</div>
      <a-select :default-value="$i18n.locale" @change="handleChange">
        <a-select-option value="zh">中文</a-select-option>
        <a-select-option value="en">英文</a-select-option>
      </a-select>
    </div>
  </base-container>
</template>

<script>
import { Button, Select, Input } from 'ant-design-vue';

import BaseContainer from '@/shared/components/BaseContainer';
import locationHelp from '@/shared/utils/locationHelp';
// import getUserInfo from '@/api';

export default {
  components: {
    'base-container': BaseContainer,
    'a-button': Button,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-input': Input,
  },

  data() {
    return {
      posts: {},
      name: '',
      age: '',
    };
  },
  beforeMount() {
    console.log('th2323', this.$i18n.locale);
  },
  methods: {
    handleChange(value) {
      locationHelp.redirect(this.switchLocalePath(value));
    },
  },
  // async fetch() {
  //   this.posts = await getUserInfo()
  //   console.log('this.posts', this.posts);
  // },
  // call fetch only on client-side
  fetchOnServer: true,
};
</script>

<style lang="less">
.banner {
  background-color: #d8d8d8;
}

</style>
