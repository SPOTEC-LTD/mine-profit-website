import dateUtils from '@/shared/intl/utils/dateUtils';
import * as urls from '@/router/consts/urls';
import Link from '@/shared/components/Link';
import formatViewCount from '@/shared/utils/formatViewCount';
import Paragraph from '@/shared/components/Paragraph';

import styles from './index.less?module';

const NewsItem = {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    updateTime() {
      return dateUtils.formatDateTime(this.info.publishTime, 'YYYY-MM-DD HH:mm');
    },
  },
  render() {
    const { imageUrl, title, id, count, topStatus, content } = this.info;

    return (
      <Link target="_blank" class={styles['news-wrapper']} to={{ path: urls.recommendDetailPath, params: { id } }}>
        <div class={styles['content-box']}>
          <div class={styles['image-wrapper']}>
            <img class={styles['news-image']} src={imageUrl} alt="" />
            {topStatus && <div class={styles.top}>{this.$t('infoTop')}</div>}
          </div>
          <div class={styles['right-content']}>
            <span class={styles['news-title']}>{title}</span>
            <div class={styles['news-text']}>
              <Paragraph row={3} >{content}</Paragraph>
            </div>
            <div>
              <span>{this.updateTime}</span>
              <span class={styles['news-view-count']}>{`${this.$t('viewCount')}：${formatViewCount(count)}`}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  },
};

export default NewsItem;
