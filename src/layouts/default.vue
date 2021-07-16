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
      <!-- <PageFooter v-if="withFooter" /> -->
    </div>
  </ConfigProvider>
</template>

<script>
import { ConfigProvider, Modal } from 'ant-design-vue';
import Cookies from 'universal-cookie';
import PageHeader from '@/shared/components/PageHeader';
import PageFooter from '@/shared/components/page-footer';
import locale from '@/shared/intl/utils/locale';
import dateUtils from '@/shared/intl/utils/dateUtils';
import localStorage from '@/shared/utils/localStorage';
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
    this.setLivechat();
    this.upateDocumentTitle();
    this.$router.afterEach(() => {
      this.upateDocumentTitle();
    });


    const userInfo = {
      "userId":595,
      "nickName":"christine_test黑鲨娇滴滴今日人家都嗯我就逗逗你",
      "invitationCode":"GHSUH",
      "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNSU5FIiwicm9sZXMiOltdLCJ1c2VySWQiOjU5NSwidXNlclR5cGUiOiJVU0VSIiwiZXhwIjoxNjM0OTU2NTUxMjgwLCJpYXQiOjE2MjYzMTY1NTEyODAsImp0aSI6ImM0Mzc3OGUxLTAzZTUtNDQ4NC1iZTM4LTk2ODQ5ZTA1MmZkMyIsInVzZXJuYW1lIjoiMTIyMjIyMjIyQHFxLmNvbSJ9.X-ZcjbKkgYbzmAJ6D8inZJxvHM6DkiIqzFrSlNn3hVw","avatar":"http://192.168.0.126:8010/__minio/bucket/464a2983-696d-450d-9635-9517e69b2239.jpeg",
      "registerStatus":false,
      "isDealCode":1,
      "kycStatus":3,
      "hasBind":1,
      "createTime":1619502599000
    }


      localStorage.setObject('userInfo', userInfo);
      localStorage.set('token', userInfo.token);
      const cookies = new Cookies();

      cookies.set('token', userInfo.token, { path: '/' });
      cookies.set('userId', userInfo.userId, { path: '/' });
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
