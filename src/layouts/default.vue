<template>
  <ConfigProvider prefix-cls="mp">
    <div>
      <PageHeader />
      <Modal title="Title" :visible="false">
        <p>asdfasfasdf</p>
      </Modal>
      <div
        class="layout"
        :style="{ 'overflow-x': overflowxHidden ? 'auto' : 'hidden' }"
      >
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
    return {};
  },
  mounted() {
    document.title = this.$t('essayHashRate')
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
};
</script>

<style>
@import "~@/shared/styles/index.less";
@import "./default.less";
</style>
