<template>
  <div class="container">
    <div>
      <span class="red">test</span>
      <span>{{ $t("app.button.abnormalSettlement", { msg: 'hello2323' }) }}</span>
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
  </div>
</template>

<script>
import { Button, Select, Input } from 'ant-design-vue';
import locationHelp from '@/shared/utils/locationHelp';
// import getUserInfo from '@/api';

export default {
  components: {
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
    console.log('th2323', this.$i18n);
  },
  methods: {
    handleChange(value) {
      console.log('this', this.$i18n.locale);
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

<style lang="less" scoped>
  @import "./index.less";
</style>
