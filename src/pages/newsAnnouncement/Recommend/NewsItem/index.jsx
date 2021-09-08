import dateUtils from '@/shared/intl/utils/dateUtils';
import * as urls from '@/router/consts/urls';
import Link from '@/shared/components/Link';
import formatViewCount from '@/shared/utils/formatViewCount';

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
    const { imageUrl, title, id, count, topStatus } = this.info;

    return (
      <Link target="_blank" class={styles['news-wrapper']} to={{ path: urls.recommendDetailPath, params: { id } }}>
        <div class={styles['image-wrapper']}>
          <img class={styles['news-image']} src={imageUrl} alt="" />
          {topStatus && <div class={styles.top}>{this.$t('infoTop')}</div>}
        </div>
        <div class={styles['mid-content']}>
          <span>{this.updateTime}</span>
          <span>{`${this.$t('viewCount')}：${formatViewCount(count)}`}</span>
        </div>
        <span class={styles['news-title']}>{title}</span>
      </Link>
    );
  },
};

export default NewsItem;
