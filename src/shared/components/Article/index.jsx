import BaseContainer from '@/shared/components/BaseContainer';
import dateUtils from '@/shared/intl/utils/dateUtils';
import isServerSide from '@/shared/utils/isServerSide';
import languages from '@/shared/intl/consts/languages';
import QRCodeModule from '@/shared/components/QRCodeModule';
import downloadAppImage from '@/assets/home/download-app-image.png';

import './index.less';

const Article = {
  props: {
    title: {
      type: String,
      default: '',
    },
    topStatus: Boolean,
    userId: {
      default: null,
    },
    publishTime: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
    showDownloadInfo: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    date() {
      return dateUtils.formatDateTime(this.publishTime, 'YYYY-MM-DD HH:mm');
    },
  },
  render() {
    const registerURL = isServerSide()
      ? ''
      : `${process.env.MOBILE_SITE_HOST}/register/${this.userId}?locale=${languages[this.$i18n.locale]}`;

    return (
      <BaseContainer contentClassName="article-wrapper">
        <div>
          <div class="article-date">
            <span>{this.date}</span>
            <span>{this.$t('noticeDetailPageViewCount', { value: this.count })}</span>
            {
              this.topStatus && <span class="article-top">{this.$t('infoTop')}</span>
            }
          </div>
          <div class="article-title">{this.title}</div>
        </div>
        <div class="article-content" domPropsInnerHTML={this.content} />
        {this.showDownloadInfo && (
          <div class="article-download-app">
            <img class="article-download-image" src={downloadAppImage} alt="" />
            <div class="article-download-right">
              <div class="article-desc-box">
                <div class="article-get-app-desc">{this.$t('getMineApp')}</div>
                <div class="article-download-app-desc">{this.$t('infoScan')}</div>
              </div>
              <QRCodeModule className="article-qr-box" value={registerURL} options={{ width: 78 }} />
            </div>
          </div>
        )}
      </BaseContainer>
    );
  },
};

export default Article;
