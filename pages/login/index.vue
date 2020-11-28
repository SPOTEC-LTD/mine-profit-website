<template>
  <div class="container">
    <div>
      <span class="red">test</span>
      <span>{{ $t("app.button.abnormalSettlement", { msg: 'hello2323' }) }}</span>
      <a-button type="primary"> Primary </a-button>

      <a-select @change="handleChange" :default-value="$i18n.locale">
        <a-select-option value="zh">中文</a-select-option>
        <a-select-option value="en">英文</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import { Button, Select } from 'ant-design-vue';
import locationHelp from '@/shared/utils/locationHelp.js'

export default {
  components: {
    'a-button': Button,
    'a-select': Select,
    'a-select-option': Select.Option
  },
  beforeMount(){
    console.log('th2323', this.$i18n);
  },
  methods: {
    handleChange(value){
      console.log('this', this.$i18n.locale)
      locationHelp.redirect(this.switchLocalePath(value))
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
