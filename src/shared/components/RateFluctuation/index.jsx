import RichText from '@/shared/components/RichText';
import ConfirmModal from '@/shared/components/ConfirmModal';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import rateFluctuationImg from '@/assets/productMarket/rateFluctuationImg.png';
import './index.less';

const RateFluctuation = {
  props: {
    visible: Boolean,
    placeOrderResult: {
      type: Object,
      default: () => {},
    },
    loading: Boolean,
  },

  methods: {
    handleConfirm() {
      this.$emit('handleConfirm');
    },

    handleCancel() {
      this.$emit('handleCancel');
    },

    payMountNode({ money, unit, title, className }) {
      return (
        <div class={className} >
          <span class='fluctuation-pay-mount-title'>{title}</span>
          <div class='fluctuation-pay-mount'>
            <span>{bigNumberToFixed(money, 8)}</span>
            <span class='fluctuation-pay-unit'>{unit}</span>
          </div>
      </div>
      );
    },

    contentNode() {
      const { chainType, currentAmount, oldAmount, balanceEnough } = this.placeOrderResult;
      return (
        <div class='fluctuation-container'>
          <div class='fluctuation-mention'>
            <img src={rateFluctuationImg} alt="" class='fluctuation-img'/>
            <RichText content={this.$t('marketRateChangeHint')} class='fluctuation-mention-content' />
          </div>

          {this.payMountNode({ money: oldAmount, unit: chainType, title: this.$t('marketOriginPayAmount') })}
          {this.payMountNode({
            money: currentAmount,
            unit: chainType,
            title: this.$t('marketCurrentPayAmount'),
            className: 'fluctuation-wait-pay',
          })}

          {!balanceEnough && (
            <div class='fluctuation-no-balance'>
              {this.$t('marketPayChainTypeNotEnough', { paymentChainType: chainType })}
            </div>
          )}
        </div>
      );
    },
  },

  render() {
    const { balanceEnough } = this.placeOrderResult;

    return (
      <div>
        <ConfirmModal
          title={this.$t('priceFluctuation')}
          width={400}
          visible={this.visible}
          confirmLoading={this.loading}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          scopedSlots={{ content: () => this.contentNode }}
          confirmDisabled={!balanceEnough}
        >
          {this.contentNode() }
        </ConfirmModal>
      </div>
    );
  },
};

export default RateFluctuation;
