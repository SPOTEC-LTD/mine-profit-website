import dateUtils from '@/shared/intl/utils/dateUtils';
import * as urls from '@/router/consts/urls';
import Link from '@/shared/components/Link';
import formatViewCount from '@/shared/utils/formatViewCount';

import styles from './index.less?module';

const AnnouncementItem = {
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
    const { title, id, count } = this.info;
    return (
      <Link
        target="_blank"
        class={styles['news-wrapper']}
        to={{ path: urls.announcementDetailPath, params: { id } }}
      >
        <div class={styles['news-date']}>
          <span>{this.updateTime}</span>
          <span>{`${this.$t('viewCount')}：${formatViewCount(count)}`}</span>
        </div>
        <div class={styles['news-title']}>{title}</div>
      </Link>
    );
  },
};

export default AnnouncementItem;
