import { mapState } from 'vuex';
import { Button } from 'ant-design-vue';
import DocFilledOutlined from 'ahoney/lib/icons/DocFilledOutlined';
import EmailCircleOutlined from 'ahoney/lib/icons/EmailCircleOutlined';
import TipCirccleOutlined from 'ahoney/lib/icons/TipCirccleOutlined';
import locationServices from '@/shared/services/location/locationServices';
import { RECOMMEND, NEWSLETTER, ANNOUNCEMENT } from '@/shared/consts/newsType';
import { I18N } from '@@/i18n';
import isEmpty from 'lodash/isEmpty';
import Link from '@/shared/components/Link';
import logoImg from '@/assets/logo-black.png';
import * as urls from '@/router/consts/urls';
import NavLink from './NavLink';
import NavMenu from './NavMenu';
import LanguageMenu from './LanguageMenu';
import LoginInfo from './LoginInfo';
import StationMail from './StationMail';

import styles from './index.less?module';

const PageHeader = {
  data() {
    return {
      languageItems: I18N.locales,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    redirectToDownloadGuidePage() {
      locationServices.push(urls.downloadPath);
    },
    getNews() {
      return [
        {
          href: urls.newsAnnouncementPath,
          name: this.$t('recommendArticle'),
          type: RECOMMEND,
          description: this.$t('recommendArticleDesc'),
          icon: <DocFilledOutlined />,
        },
        {
          href: urls.newsAnnouncementPath,
          name: this.$t('newsletter'),
          type: NEWSLETTER,
          description: this.$t('newsletterDesc'),
          icon: <EmailCircleOutlined />,
        },
        {
          href: urls.newsAnnouncementPath,
          name: this.$t('announcement'),
          type: ANNOUNCEMENT,
          description: this.$t('announcementDesc'),
          icon: <TipCirccleOutlined />,
        },
      ];
    },
    getHashrateMarkets() {
      return ([
        {
          href: urls.officialMarketingPath,
          name: this.$t('marketOfficialMarket'),
        },
        {
          href: urls.c2cMarketingPath,
          name: this.$t('marketC2CMarket'),
        },
      ]);
    },
  },

  render() {
    const [pageName] = this.$route.name.split('___');
    const isNotLoginPage = pageName !== 'login';

    return (
      <div class={styles['page-header']}>
        <div class={styles['page-header-container']}>
          <div class={styles['header-left-content']}>
            <Link to={urls.homePath}>
              <img class={styles['page-header-logo']} src={logoImg} alt="MINE PROFIT" />
            </Link>
            <div class={styles['page-header-nav']}>
              <NavLink href={urls.homePath}>{this.$t('home')}</NavLink>
              <NavMenu hrefPrefix={urls.marketingPaths} items={this.getHashrateMarkets()}>
                {this.$t('hashRateMarket')}
              </NavMenu>
              <NavMenu hrefPrefix={urls.newsPath} items={this.getNews()}>{this.$t('newsAnnouncement')}</NavMenu>
              <NavLink href={urls.helpPath}>{this.$t('helpCenter')}</NavLink>
              <NavLink href={urls.aboutUsPaths}>{this.$t('aboutUs')}</NavLink>
            </div>
          </div>
          <div class={styles['header-right-content']}>
            {isNotLoginPage && <LoginInfo />}
            {isNotLoginPage && !isEmpty(this.userInfo) && <StationMail />}
            <LanguageMenu items={this.languageItems}>{this.$t('language')}</LanguageMenu>
            <Button class="download-button" type="primary" onClick={this.redirectToDownloadGuidePage}>
              {this.$t('downloadNow')}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export default PageHeader;
