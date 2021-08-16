import { Carousel } from 'ant-design-vue';
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

  render() {
    return (
      <div class={styles['banner-box']}>
        <Carousel autoplay>
          {
            this.list.map(({ id, webImage }) => (
              <div class={styles['banner-img-box']}>
                <img src={webImage} alt="" key={id} />
              </div>
            ))
          }
        </Carousel>
      </div>
    );
  },
};

export default Home;
