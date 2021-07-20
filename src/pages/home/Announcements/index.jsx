import { Carousel } from 'ant-design-vue';

import gongGaoIcon from '@/assets/home/gonggao.svg';
import NavLink from '@/shared/components/NavLink';
// import { announcementDetailPath, infoPath } from '@/router/consts/urls';
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
                <NavLink
                  key={i}
                  class={styles['announce-main']}
                  to={{
                    // path: announcementDetailPath,
                    path: '/', // TODO
                    params: { id },
                    query: { redirectPageUrl: currentFullPath },
                  }}
                >
                  {title}
                </NavLink>
              ))
            }
          </Carousel>
        </div>
        <NavLink
          class={styles['announce-more']}
          // to={{ path: infoPath, query: { activeName: 'announcement' } }}
          to='/' // TODO
        >
          {this.$t('noticeCarouselTitle')}
        </NavLink>
      </div>
    );
  },
};

export default Announcements;
