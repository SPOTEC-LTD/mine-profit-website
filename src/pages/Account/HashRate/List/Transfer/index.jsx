import { Row, Col } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import ProductTitle from '@/shared/components/ProductTitle';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import locationServices from '@/shared/services/location/locationServices';
import { TRANSFER_DONE } from '@/pages/Account/HashRate/consts/transferOderStatus';
import { TRANSFER_VIP_HASHRATE } from '@/pages/Account/HashRate/consts/TransferhashrateType';

import CardFooter from './CardFooter';

const Transfer = {
  props: ['dataSource'],
  methods: {
    getTransferItemAmount(data) {
      const transAmountValue = numberUtils.formatNumber(data.transAmount, { minimumFractionDigits: 2 });

      if (data.status === TRANSFER_DONE) {
        return transAmountValue;
      }

      const amountValue = numberUtils.formatNumber(data.amount, { minimumFractionDigits: 2 });

      return `${transAmountValue}/${amountValue}`;
    },

    getListData(data) {
      return [
        {
          label: this.$t('hashrateOperationTransfer'), // '转让算力',
          value: (
            <CellValue
              value={this.getTransferItemAmount(data)}
              unit={data.unit}
            />),
        },
        {
          label: this.$t('transferItemPrice'), // '转让单价',
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.price, { minimumFractionDigits: 2 })}
              unit={`USDT/${data.unit}`}
            />),
        },
        {
          label: this.$t('transferItemFee'), // '转让手续费',
          value: (
            <CellValue
              value="1.5"
              unit="%"
            />),
        },
        {
          label: this.$t('transferItemNetMoney'), // '净转让金额',
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.actualPrice, { minimumFractionDigits: 2 })}
              unit="USDT"
            />),
        },
      ];
    },

    onClickToProductTemplate(ptId, isVipHashrate) {
      const currentFullPath = this.$router.history.current.fullPath;
      if (!isVipHashrate) {
        locationServices.push(
          'officialProductTemplatePath',
          { params: { id: ptId }, query: { redirectHashRateUrl: currentFullPath } },
        );
      }
    },
  },

  render() {
    return (
      <Row gutter={28} type="flex">
        {
          this.dataSource.map(item => {
            const isVipHashrate = item.type === TRANSFER_VIP_HASHRATE;

            const header = (
              <ProductTitle
                className="card-product-title"
                chainType={item.hashrateType}
                scopedSlots={{
                  name: () => (<span class='product-title-value'>{item.name}</span>),
                }}
                onHandleClick={() => { this.onClickToProductTemplate(item.productTemplateId, isVipHashrate); }}
              />
            );

            return (
              <Col span={8}>
                <Card
                  scopedSlots={{
                    header: () => header,
                    footer: () => (
                      <CardFooter data={item} onRefresh={() => this.$emit('refresh')} />
                    ),
                  }}
                >
                  <ListCell dataSource={this.getListData(item)} />
                </Card>
              </Col>
            );
          })
        }
      </Row>
    );
  },
};

export default Transfer;
