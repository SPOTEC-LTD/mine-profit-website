import { Button } from 'ant-design-vue';
import DocFilledOutlined from 'ahoney/lib/icons/DocFilledOutlined';
import EmailCircleOutlined from 'ahoney/lib/icons/EmailCircleOutlined';
import TipCirccleOutlined from 'ahoney/lib/icons/TipCirccleOutlined';
import locationServices from '@/shared/services/location/locationServices';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';
import { I18N } from '@/shared/intl/i18n';
import Link from '@/shared/components/link';
import logoImg from '@/assets/logo-black.png';
import NavLink from './nav-link.vue';
import NavMenu from './nav-menu.jsx';
import LanguageMenu from './language-menu.jsx';

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
              <NavLink href="/ecosphere">{this.$t('ecosphere') }</NavLink>
              <NavMenu href-prefix="/newsAnnouncement" items={this.items}>{ this.$t('newsAnnouncement') }</NavMenu>
              <NavLink href="/help">{this.$t('helpCenter') }</NavLink>
            </div>
          </div>
          <div>
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
