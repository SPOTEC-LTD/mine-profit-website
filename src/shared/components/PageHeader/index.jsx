import { Button } from 'ant-design-vue';
import DocFilledOutlined from 'ahoney/lib/icons/DocFilledOutlined';
import EmailCircleOutlined from 'ahoney/lib/icons/EmailCircleOutlined';
import TipCirccleOutlined from 'ahoney/lib/icons/TipCirccleOutlined';
import locationServices from '@/shared/services/location/locationServices';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';
import { I18N } from '@/shared/intl/i18n';
import Link from '@/shared/components/link';
import logoImg from '@/assets/logo-black.png';
import NavLink from './NavLink';
import NavMenu from './NavMenu';
import LanguageMenu from './LanguageMenu';
import LoginInfo from './LoginInfo';

import styles from './index.less?module';

const PageHeader = {
  data() {
    return {
      items: [
        {
          href: '/newsAnnouncement',
          name: this.$t('recommendArticle'),
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: '/newsAnnouncement',
          name: this.$t('newsletter'),
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
        {
          href: '/newsAnnouncement',
          name: this.$t('announcement'),
          type: ANNOUNCEMENT,
          description: this.$t('announcementDesc'),
          icon: <TipCirccleOutlined />,
        },
      ],
      languageItems: I18N.locales,
    };
  },
  methods: {
    redirectToDownloadGuidePage() {
      locationServices.push('/download');
    },
    getNews() {
      return [
        {
          href: '/newsAnnouncement',
          name: this.$t('recommendArticle'),
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: '/newsAnnouncement',
          name: this.$t('newsletter'),
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
        {
          href: '/newsAnnouncement',
          name: this.$t('announcement'),
          type: ANNOUNCEMENT,
          description: this.$t('announcementDesc'),
          icon: <TipCirccleOutlined />,
        },
      ];
    },
    getAboutUs() {
      return ([
        {
          href: '/newsAnnouncement',
          name: '关于我们',
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: '/ecosphere',
          name: this.$t('ecosphere'),
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
      ]);
    },
    getHashrateMarkets() {
      return ([
        {
          href: '/newsAnnouncement',
          name: '官方市场',
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: '/ecosphere',
          name: 'C2C市场',
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
      ]);
    },
  },

  render() {
    return (
      <div class={styles['page-header']}>
        <div class={styles['page-header-container']}>
          <div class={styles['header-left-content']}>
            <Link to="/">
              <img class={styles['page-header-logo']} src={logoImg} alt="MINE PROFIT" />
            </Link>
            <div class={styles['page-header-nav']}>
              <NavLink href="/">{ this.$t('home') }</NavLink>
              <NavMenu hrefPrefix="/newsAnnouncement" items={this.getAboutUs()}>关于我们</NavMenu>
              <NavMenu hrefPrefix="/newsAnnouncement" items={this.getAboutUs()}>算力市场</NavMenu>
              <NavMenu hrefPrefix="/newsAnnouncement" items={this.items}>{ this.$t('newsAnnouncement') }</NavMenu>
              <NavLink href="/help">{this.$t('helpCenter') }</NavLink>
            </div>
          </div>
          <div class={styles['header-right-content']}>
            <LoginInfo />
            <LanguageMenu items={this.languageItems}>{ this.$t('language') }</LanguageMenu>
            <Button class={styles['page-header-download']} type="primary" onClick={this.redirectToDownloadGuidePage}>
              { this.$t('downloadNow') }
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export default PageHeader;
