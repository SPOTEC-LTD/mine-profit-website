import { Carousel } from 'ant-design-vue';

import gongGaoIcon from '@/assets/home/gonggao.svg';
import Link from '@/shared/components/Link';
import { announcementDetailPath, newsAnnouncementPath } from '@/router/consts/urls';
import { ANNOUNCEMENT } from '@/shared/consts/newsType';
import styles from './index.less?module';

const Announcements = {
  props: {
    announcementList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  render() {
    const currentFullPath = this.$router.history.current.fullPath;
    return (
      <div class={styles['announce-wrapper']}>
        <div class={styles['announce-left']}>
          <div class={styles['announce-img-box']}>
            <img src={gongGaoIcon} alt="" />
          </div>
          <Carousel
            autoplay
            dotPosition='left'
            dots={false}
            class={styles['announce-main-box']}
          >
            {
              this.announcementList.map(({ title, id }, i) => (
                <Link
                  key={i}
                  class={styles['announce-main']}
                  to={{
                    path: announcementDetailPath,
                    params: { id },
                    query: { redirectPageUrl: currentFullPath },
                  }}
                >
                  {title}
                </Link>
              ))
            }
          </Carousel>
        </div>
        <Link
          class={styles['announce-more']}
          to={{ path: newsAnnouncementPath, query: { type: ANNOUNCEMENT } }}
        >
          {this.$t('noticeCarouselTitle')}
        </Link>
      </div>
    );
  },
};

export default Announcements;
