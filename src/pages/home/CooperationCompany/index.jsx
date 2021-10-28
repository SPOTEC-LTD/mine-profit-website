import BlockTitle from '@/shared/components/BlockTitle';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import CooperationMap from '@/pages/home/component/CooperationMap';
import cooperationTitleImage from '@/assets/home/cooperation-company.png';

import styles from './index.less?module';

const CooperationCompany = {
  data() {
    return {
      cooperationTitleImage,
      isChinese: getIsChinese(),
    };
  },

  render() {
    return (
      <div class={styles['cooperation-container']}>
        <div class={styles['cooperation-company-container']}>
          <BlockTitle
            img={cooperationTitleImage}
            class={styles['cooperation-title-image']}
            title={this.isChinese && this.$t('cooperationPartner')}
          />
          <div class={styles['cooperation-introduce']}>
            <div>
              {this.$t('companyBackground', {
                enProductName: this.$t('enProductName'),
                zhProductName: this.$t('zhProductName'),
              })}
            </div>
          </div>
        </div>
        <CooperationMap />
      </div>
    );
  },
};

export default CooperationCompany;
