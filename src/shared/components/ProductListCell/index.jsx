import { mapActions, mapState } from 'vuex';
import ProductBriefCell from '@/shared/components/ProductBriefCell';
import { RATE_EXCHANGE, GET_RATE_EXCHANGE } from '@/modules/rateExchange';

const ProductMarket = {
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    this[GET_RATE_EXCHANGE]();
  },

  computed: {
    ...mapState({
      rateExchangeList: state => state.rateExchange.rateExchangeList,
    }),
  },

  methods: {
    ...mapActions(RATE_EXCHANGE, [GET_RATE_EXCHANGE]),
  },

  render() {
    return (
      <div>
        {this.productList.map(
          item => (
            <ProductBriefCell
              productData={item}
              key={item.id}
              rateList={this.rateExchangeList}
            />
          ),
        )}
      </div>
    );
  },
};

export default ProductMarket;
