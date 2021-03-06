import { Row, Col } from 'ant-design-vue';
import { productTemplatePath } from '@/router/consts/urls';
import ProductTitle from '@/shared/components/ProductTitle';
import {
  WAIT_BUY,
  PLEDGES_ING,
  BALANCE_PENDING,
  SETTLE_ACCOUNTS,
  END_REPAYMENT,
} from '@/pages/Account/HashRate/consts/pledgesOderStatus';
import locationServices from '@/shared/services/location/locationServices';
import { VIP_HASHRATE } from '@/pages/Account/HashRate/consts/hashrateType';
import PledgesIngCard from './PledgeOrderCard/PledgesIng';
import WaitBuyCard from './PledgeOrderCard/WaitBuy';
import BalancePendingCard from './PledgeOrderCard/BalancePending';
import SettleAccountsCard from './PledgeOrderCard/SettleAccounts';
import EndRepaymentCard from './PledgeOrderCard/EndRepayment';

const orderCardComponentMap = {
  [WAIT_BUY]: WaitBuyCard,
  [PLEDGES_ING]: PledgesIngCard,
  [BALANCE_PENDING]: BalancePendingCard,
  [SETTLE_ACCOUNTS]: SettleAccountsCard,
  [END_REPAYMENT]: EndRepaymentCard,
};

const Pledges = {
  props: ['dataSource'],

  methods: {
    getCardTitleNode(data) {
      const isVipHashrate = data.type === VIP_HASHRATE;

      const headerNode = (
        <ProductTitle
          className="card-product-title"
          chainType={data.hashrateType}
          scopedSlots={{
            name: () => (<span class='product-title-value'>{data.productTemplateName}</span>),
          }}
          onHandleClick={() => { this.onClickToProductTemplate(data.productTemplateId, isVipHashrate); }}
        />
      );

      return headerNode;
    },

    onClickToProductTemplate(ptId, isVipHashrate) {
      if (!isVipHashrate) {
        locationServices.push(productTemplatePath, { params: { id: ptId } });
      }
    },
  },

  render() {
    return (
      <Row gutter={28} type="flex">
        {
          this.dataSource.map(item => {
            const CardComponent = orderCardComponentMap[item.status];
            return (
              <Col span={8}>
                <CardComponent
                  data={item}
                  onRefresh={() => { this.$emit('refresh'); }}
                  scopedSlots={{
                    title: () => this.getCardTitleNode(item),
                  }}
                />
              </Col>
            );
          })
        }
      </Row>
    );
  },
};

export default Pledges;
