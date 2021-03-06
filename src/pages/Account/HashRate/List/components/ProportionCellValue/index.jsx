import numberUtils from 'aa-utils/lib/numberUtils';
import InfoModal from '@/shared/components/InfoModal';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import ProportionDetails from './ProportionDetails';
import styles from './index.less?module';

const ProportionCellValue = {
  props: {
    data: Object,
  },

  render() {
    const { promotionBonus, proportion, levelName } = this.data;
    const hasPromotionBonus = promotionBonus > 0;

    return (
      <CellValue
        scopedSlots={{
          value: () => (
            <InfoModal
              disabled={!hasPromotionBonus}
              scopedSlots={{
                content: () => (
                  <ProportionDetails
                    promotionBonus={promotionBonus}
                    proportion={proportion}
                    levelName={levelName}
                  />
                ),
              }}>
              <span>
                <span>{numberUtils.formatPercent(this.data.proportion, { minimumFractionDigits: 2 })}</span>
                {
                  hasPromotionBonus && (
                    <span class={['modal-text-link', styles['promotion-bonus']]}>
                      +{numberUtils.formatPercent(this.data.promotionBonus, { minimumFractionDigits: 2 })}
                    </span>
                  )
                }
              </span>
            </InfoModal>
          ),
        }}
        showIcon={hasPromotionBonus}
      />
    );
  },
};

export default ProportionCellValue;
