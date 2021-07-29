<template>
  <ConfigProvider prefix-cls="mp" :locale="anLocale">
    <div>
      <PageHeader />
      <div
        class="layout"
        :style="{ 'overflow-x': overflowxHidden ? 'auto' : 'hidden' }"
      >
        <Nuxt />
      </div>
      <PageFooter v-if="!hiddenFooter"/>
    </div>
  </ConfigProvider>
</template>

<script>
import Vue from 'vue';
import { ConfigProvider, Modal } from 'ant-design-vue';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import PageHeader from '@/shared/components/PageHeader';
import PageFooter from '@/shared/components/page-footer';
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';
import { ErrorNode, SuccessNode } from '@/shared/services/Notification';

import { getZendesk } from '@/api';

export default {
  components: {
    ConfigProvider,
    PageHeader,
    PageFooter,
  },
  props: {
    overflowxHidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    locale.init(this.$i18n);
    dateUtils.locale = this.$i18n.locale;
    const anLocalMap = {
      zh: zhCN,
      en: enUS
    }

    console.log('--', this.$route)
    return {
      anLocale: anLocalMap[this.$i18n.locale],
      hiddenFooter: this.$route.meta.hiddenFooter
    };
  },
  mounted() {
    Vue.component('ErrorNode', ErrorNode);
    Vue.component('SuccessNode', SuccessNode);
    Vue.use(Modal);
    document.title = this.$t('essayHashRate')
    this.setLivechat();
    this.upateDocumentTitle();
    this.$router.afterEach(() => {
      this.upateDocumentTitle();
    });
  },

  methods: {
    setLivechat(){
      getZendesk().then(({ body: { apiZendeskWebVo } }) => {
        window.__lc = window.__lc || {};
        window.__lc.license = apiZendeskWebVo.webKey;
        (function (n, t, c) {
          function i(n) {
            return e._h ? e._h.apply(null, n) : e._q.push(n);
          }
          var e = {
            _q: [],
            _h: null,
            _v: '2.0',
            on() {
              i(['on', c.call(arguments)]);
            },
            once() {
              i(['once', c.call(arguments)]);
            },
            off() {
              i(['off', c.call(arguments)]);
            },
            get() {
              if (!e._h) {
                throw new Error(
                  "[LiveChatWidget] You can't use getters before load.",
                );
              }
              return i(['get', c.call(arguments)]);
            },
            call() {
              i(['call', c.call(arguments)]);
            },
            init() {
              const n = t.createElement('script');
              (n.async = !0),
              (n.type = 'text/javascript'),
              (n.src = 'https://cdn.livechatinc.com/tracking.js'),
              t.head.appendChild(n);
            },
          };
          !n.__lc.asyncInit && e.init(),
          (n.LiveChatWidget = n.LiveChatWidget || e);
        }(window, document, [].slice));
      });
    },

    upateDocumentTitle() {
      const [pageNameKey] = this.$route.name.split('__');
      document.title = this.$t(`${pageNameKey}`);
    },
  },
};
</script>

<style lang="less">
  @import "~@/shared/styles/index.less";
  @import "./default.less";
</style>
