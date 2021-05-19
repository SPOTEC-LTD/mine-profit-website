<template>
  <ConfigProvider prefix-cls="mp">
    <div>
      <PageHeader />
      <Modal
        title="Title"
        :visible="false"
      >
        <p>asdfasfasdf</p>
      </Modal>
      <div class="layout" :style="{'overflow-x': overflowxHidden ? 'auto' : 'hidden'}">
        <Nuxt />
      </div>
      <PageFooter v-if="withFooter" />
    </div>
  </ConfigProvider>
</template>

<script>
import { ConfigProvider, Modal } from 'ant-design-vue';
import PageHeader from '@/shared/components/page-header';
import PageFooter from '@/shared/components/page-footer';
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';
// import 'ant-design-vue/lib/modal/style/index';
import { getZendesk } from '@/api';

export default {
  components: {
    ConfigProvider,
    PageHeader,
    PageFooter,
    Modal,
  },
  props: {
    overflowxHidden: {
      type: Boolean,
      default: false,
    },
    withFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    locale.init(this.$i18n);
    dateUtils.locale = this.$i18n.locale;
    return {

    };
  },
  mounted() {
    getZendesk().then(({ body: { apiZendeskWebVo } }) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'ze-snippet';
      script.charset = 'utf-8';
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=${apiZendeskWebVo.webKey}`; // 填自己的js路径
      document.querySelector('head').appendChild(script);
    });
  },
};
</script>

<style>
@import "~@/shared/styles/index.less";
@import "./default.less";
</style>
