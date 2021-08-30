import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const CorporateCultureItem = {
  props: {
    image: String,
    title: String,
    description: String,
  },

  data() {
    return {
      isChinese: getIsChinese(),
    };
  },

  render() {
    return (
      <div class={styles['item-wrapper']}>
        <img src={this.image} alt="" class={styles['culture-img']}/>
        <span class={styles['culture-title']}>{this.title}</span>
        <span class={styles['culture-description']}>{this.description}</span>
      </div>
    );
  },
};

export default CorporateCultureItem;
