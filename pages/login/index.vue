<template>
  <div class="container">
    <div>
      <span class="red">test</span>
      <span>{{ $t("app.button.abnormalSettlement", { msg: 'hello2323' }) }}</span>
      <a-button type="primary"> Primary </a-button>

      <a-select default-value="zh" @change="handleChange">
        <a-select-option value="zh">中文</a-select-option>
        <a-select-option value="en">英文</a-select-option>
      </a-select>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Select } from 'ant-design-vue';
export default {
  components: {
    'a-button': Button,
    'a-select': Select,
    'a-select-option': Select.Option
  },
  methods: {
    handleChange(value){
      console.log('value', value)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
