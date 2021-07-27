import unchosenTriangle from '@/assets/productMarket/unchosenTriangle.png';
import downTriangle from '@/assets/productMarket/downTriangle.png';
import upTriangle from '@/assets/productMarket/upTriangle.png';
import './index.less';

const FieldOrder = {
  props: ['defaultOrder', 'label', 'value'],
  data() {
    return {
      imgMap: [unchosenTriangle, upTriangle, downTriangle],
      orders: ['default', 'ascend', 'descend'],
      nowOrderIndex: this.value,
    };
  },

  watch: {
    value() {
      this.nowOrderIndex = this.value;
    },
  },

  methods: {
    handleOrder() {
      if (this.nowOrderIndex < 2) {
        this.nowOrderIndex += 1;
      } else {
        this.nowOrderIndex = 0;
      }

      this.$emit('sortChange', {
        orderIndex: this.nowOrderIndex,
        order: this.orders[this.nowOrderIndex],
      });
    },
  },

  render() {
    return (
      <div class="order-wrapper" onClick={this.handleOrder}>
        <span class={{ 'order-field': this.nowOrderIndex > 0 }}>{this.label}</span>
        <img src={this.imgMap[this.nowOrderIndex]} alt="" class="order-img" />
      </div>
    );
  },
};

export default FieldOrder;
