import { Row, Col } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import { productTemplatePath } from '@/router/consts/urls';
import ProductTitle from '@/shared/components/ProductTitle';
import DateUtils from '@/shared/intl/utils/dateUtils';
import { ON } from '@/pages/Account/HashRate/consts/shutdownStatus';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import locationServices from '@/shared/services/location/locationServices';
import { VIP_HASHRATE } from '@/pages/Account/HashRate/consts/hashrateType';

import CardFooter from './CardFooter';

const Shutdown = {
  props: ['dataSource'],
  methods: {
    getListData(data) {
      const listData = [
        {
          label: this.$t('hashrateShutDownHashrate'), // 关机算力
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.amount, { minimumFractionDigits: 2 })}
              unit={data.unit}
            />),
        },
        {
          label: this.$t('hashrateShutDownTime'), // 关机时间
          value: DateUtils.formatDate(data.shutdownTime, 'YYYY.MM.DD') || '1970.01.01',
        },
      ];

      const excavationTime = [
        {
          label: this.$t('marketStartMineTime'), // 开挖时间
          value: DateUtils.formatDate(data.excavationTime, 'YYYY.MM.DD') || '1970.01.01',
        },
      ];

      return data.shutdownStatus === ON ? [...listData, ...excavationTime] : listData;
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
            const isVipHashrate = item.type === VIP_HASHRATE;
            const nameNode = (
              <span class='product-title-value'>
                { isVipHashrate ? this.$t('hashrateVIPHash') : item.name}
              </span>
            );

            const header = (
              <ProductTitle
                className="card-product-title"
                chainType={item.hashrateType}
                leftExtra={isVipHashrate && item.name}
                scopedSlots={{
                  name: () => nameNode,
                }}
                onHandleClick={() => { this.onClickToProductTemplate(item.productTemplateId, isVipHashrate); }}
              />
            );

            return (
              <Col span={8}>
                <Card
                  scopedSlots={{
                    header: () => header,
                    footer: () => <CardFooter data={item} />,
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

export default Shutdown;
