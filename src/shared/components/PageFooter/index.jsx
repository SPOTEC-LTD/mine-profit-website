import { fetchBizSocialInfo } from '@/api';
import MailFilled from 'ahoney/lib/icons/MailFilled';
import TwitterFilled from 'ahoney/lib/icons/TwitterFilled';
import FacebookFilled from 'ahoney/lib/icons/FacebookFilled';
import footerSubject from '@/assets/footer-subject.png';
import enFooterSubject from '@/assets/en-footer-subject.png';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import { newsAnnouncementPath, helpPath, aboutUsPaths, officialMarketingPath, c2cMarketingPath } from '@/router/consts/urls';
import FooterMenuItem from './FooterMenuItem';
import './index.less';

const PageFooter = {
  data() {
    return {
      socialData: {},
      isEnLanguage: getIsEnglish(),
      hashRateMarketData: [
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
      helpCenterData: [
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
      businessCop: [
        {
          // TODO 目前还无网页，ui说还有联系我们页面
          to: helpPath,
          isReload: true,
          text: this.$t('contactUs'),
        },
      ],
    };
  },

  mounted() {
    this.fetchBizSocialData();
  },

  methods: {
    fetchBizSocialData() {
      fetchBizSocialInfo().then(data => {
        const { body: { otherSettings } } = data;
        this.socialData = otherSettings;
      });
    },

    getInformationData() {
      const newsList = [
        {
          to: { path: newsAnnouncementPath, query: { type: '2' } },
          isReload: true,
          text: this.$t('newsletter'),
          hidden: this.isEnLanguage,
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
      ];
      return newsList.filter(({ hidden }) => !hidden);
    },
  },

  render() {
    const { twitter, facebook, email } = this.socialData;

    return (
      <div class="page-footer">
          <div class="page-footer-container">
            <div class="page-footer-subject">
              {!this.isEnLanguage && <img class="page-footer-vision" src={footerSubject} alt="" />}
              {this.isEnLanguage && <img class="en-page-footer-vision" src={enFooterSubject} alt="" />}
              <div class="page-footer-social">
                <div class="page-footer-social-content">
                  {twitter && (
                    <a class="page-footer-icon" href={twitter} target="_blank"><TwitterFilled /></a>
                  )}
                  {facebook && (
                    <a class="page-footer-icon" href={facebook} target="_blank"><FacebookFilled /></a>
                  )}
                  {email && (
                    <div class="page-footer-email">
                      <span class="page-footer-icon"><MailFilled /></span>
                      <a href={`mailto:${email}`} class="email-address">Email:{email}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="page-footer-navs">
              <FooterMenuItem navTitle={this.$t('hashRateMarket')} itemData={this.hashRateMarketData} />
              <FooterMenuItem navTitle={this.$t('information')} itemData={this.getInformationData()} />
              <FooterMenuItem navTitle={this.$t('support')} itemData={this.helpCenterData} />
              <FooterMenuItem navTitle={this.$t('businessCooperation')} itemData={this.businessCop} />
            </div>
          </div>
      </div>
    );
  },
};

export default PageFooter;
