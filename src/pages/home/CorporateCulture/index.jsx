import ourMissionImg from '@/assets/home/our-mission-img.png';
import ourVisionImg from '@/assets/home/our-vision-img.png';
import ourWorthImg from '@/assets/home/our-worth-img.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import CorporateCultureItem from '@/pages/home/component/CorporateCultureItem';
import styles from './index.less?module';

const CorporateCulture = {
  data() {
    return {
      isChinese: getIsChinese(),
      cultureData: [
        {
          title: this.$t('ourVision'),
          content: this.$t('ourVisionDec'),
          image: ourMissionImg,
        },
        {
          title: this.$t('ourMission'),
          content: this.$t('ourMissionDec'),
          image: ourVisionImg,
        },
        {
          title: this.$t('ourWorth'),
          content: this.$t('ourWorthDec'),
          image: ourWorthImg,
        },
      ],
    };
  },

  render() {
    return (
      <div class={styles['corporate-culture-container']}>
        {this.cultureData.map((item, index) => (
            <CorporateCultureItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.content}
            />
        ))}
      </div>
    );
  },
};

export default CorporateCulture;
