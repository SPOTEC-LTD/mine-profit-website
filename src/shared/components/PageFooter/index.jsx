import { fetchBizSocialInfo } from '@/api';
import MailFilled from 'ahoney/lib/icons/MailFilled';
import TwitterFilled from 'ahoney/lib/icons/TwitterFilled';
import FacebookFilled from 'ahoney/lib/icons/FacebookFilled';
import footerSubject from '@/assets/footer-subject.png';
import enFooterSubject from '@/assets/en-footer-subject.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import {
  helpPath,
  aboutUsPaths,
  c2cMarketingPath,
  newsAnnouncementPath,
  officialMarketingPath,
} from '@/router/consts/urls';

import FooterMenuItem from './FooterMenuItem';
import './index.less';

const PageFooter = {
  data() {
    return {
      socialData: {},
      isCnLanguage: getIsChinese(),
      menuList: [
        {
          navTitle: this.$t('hashRateMarket'),
          list: [
            {
              to: officialMarketingPath,
              isReload: true,
              text: this.$t('marketOfficialMarket'),
            },
            {
              to: c2cMarketingPath,
              isReload: true,
              text: this.$t('marketC2CMarket'),
            },
          ],
        },
        {
          navTitle: this.$t('information'),
          list: [
            {
              to: { path: newsAnnouncementPath, query: { type: '2' } },
              isReload: true,
              text: this.$t('newsletter'),
              hidden: !getIsChinese(),
            },
            {
              to: { path: newsAnnouncementPath, query: { type: '1' } },
              isReload: true,
              text: this.$t('recommendArticle'),
            },
            {
              to: { path: newsAnnouncementPath, query: { type: '3' } },
              isReload: true,
              text: this.$t('announcement'),
            },
          ],
        },
        {
          navTitle: this.$t('support'),
          list: [
            {
              to: helpPath,
              isReload: true,
              text: this.$t('helpCenter'),
            },
            {
              to: aboutUsPaths,
              isReload: true,
              text: this.$t('aboutUs'),
            },
          ],
        },
      ],
      copyrightInfo: 'Copyright © 2021 MineProfit',
    };
  },

  mounted() {
    this.fetchBizSocialData();
  },

  methods: {
    fetchBizSocialData() {
      fetchBizSocialInfo().then(data => {
        const {
          body: { otherSettings },
        } = data;
        this.socialData = otherSettings;
      });
    },
  },

  render() {
    const { twitter, facebook, email } = this.socialData;

    return (
      <div class="page-footer">
        <div class="page-footer-container">
          <div class="page-footer-subject">
            {this.isCnLanguage && (
              <img class="page-footer-vision" src={footerSubject} alt="" />
            )}
            {!this.isCnLanguage && (
              <img class="en-page-footer-vision" src={enFooterSubject} alt="" />
            )}
            <div class="page-footer-social">
              <div class="page-footer-social-content">
                {twitter && (
                  <a class="page-footer-icon" href={twitter} target="_blank">
                    <TwitterFilled />
                  </a>
                )}
                {facebook && (
                  <a class="page-footer-icon" href={facebook} target="_blank">
                    <FacebookFilled />
                  </a>
                )}
                {email && (
                  <div class="page-footer-email">
                    <span class="page-footer-icon">
                      <MailFilled />
                    </span>
                    <a href={`mailto:${email}`} class="email-address">
                      Email:{email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div class="page-footer-navs">
            {this.menuList.map((item, index) => (
              <FooterMenuItem
                key={index}
                navTitle={item.navTitle}
                itemData={item.list.filter(({ hidden }) => !hidden)}
              />
            ))}
          </div>
        </div>
        <div class="copyright-container">{this.copyrightInfo}</div>
      </div>
    );
  },
};

export default PageFooter;
