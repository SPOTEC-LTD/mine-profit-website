import { Carousel } from 'ant-design-vue';
import cnHomeBanner1 from '@/assets/home/home-banner-1.png';
import cnHomeBanner2 from '@/assets/home/home-banner-2.png';
import cnHomeBanner3 from '@/assets/home/home-banner-3.png';
import enHomeBanner1 from '@/assets/home/en-home-banner-1.png';
import enHomeBanner2 from '@/assets/home/en-home-banner-2.png';
import enHomeBanner3 from '@/assets/home/en-home-banner-3.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

import styles from './index.less?module';

const bannerMap = {
  cnBannerImgList: [{
    id: 1, src: cnHomeBanner1,
  },
  {
    id: 2, src: cnHomeBanner2,
  },
  {
    id: 3, src: cnHomeBanner3,
  }],
  enBannerImgList: [{
    id: 1, src: enHomeBanner1,
  },
  {
    id: 2, src: enHomeBanner2,
  },
  {
    id: 3, src: enHomeBanner3,
  }],
};

const Home = {
  computed: {
    finallyBannerImgList() {
      return getIsChinese() ? bannerMap.cnBannerImgList : bannerMap.enBannerImgList;
    },
  },

  render() {
    return (
      <div class={styles['banner-box']}>
        <Carousel autoplay>
          {
            this.finallyBannerImgList.map(({ id, src }) => (
              <img src={src} alt="" key={id} />
            ))
          }
        </Carousel>
      </div>

    );
  },
};

export default Home;
