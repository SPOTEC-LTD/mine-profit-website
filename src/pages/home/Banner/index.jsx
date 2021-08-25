import { Carousel } from 'ant-design-vue';
import { bannerDetailPath } from '@/router/consts/urls';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import locationHelp from '@/shared/utils/locationHelp';

import { LINK, H5_CONTENT } from './bannerTypes';

import styles from './index.less?module';

const Home = {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    viewDetail(banner) {
      const { linkType, linkUrl, id } = banner;
      if (linkType === LINK) {
        window.open(linkUrl);
      } else if (linkType === H5_CONTENT) {
        const { userId = 'null' } = getUserInfoFunc();
        locationHelp.open(bannerDetailPath, { params: { userId, id } });
      }
    },
  },

  render() {
    return (
      <div class={styles['banner-box']}>
        <Carousel autoplay>
          {
            this.list.map(item => (
              <div
                class={styles['banner-img-box']}
                onClick={() => { this.viewDetail(item); }}
              >
                <img src={item.webImage} alt="" key={item.id} />
              </div>
            ))
          }
        </Carousel>
      </div>
    );
  },
};

export default Home;
