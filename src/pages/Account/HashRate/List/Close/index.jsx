import { Row, Col } from 'ant-design-vue';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import ProductTitle from '@/shared/components/ProductTitle';
import DateUtils from '@/shared/intl/utils/dateUtils';
import ProportionCellValue from '@/pages/Account/HashRate/List/components/ProportionCellValue';
import HashrateBuffCellValue from '@/pages/Account/HashRate/List/components/HashrateBuffCellValue';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import locationServices from '@/shared/services/location/locationServices';
import { VIP_HASHRATE } from '@/pages/Account/HashRate/consts/hashrateType';
import CardFooter from './CardFooter';

const Ordinary = {
  props: ['dataSource'],
  methods: {
    getListData(data) {
      const listData = [
        {
          label: this.$t('ratioDialogRatio'), // '分配比例',
          value: <ProportionCellValue data={data} />,
        },
        {
          label: this.$t('hashrateBuff'),
          value: (<HashrateBuffCellValue data={data} />),
        },
        {
          label: this.$t('marketStartMineTime'), // '开挖时间',
          value: DateUtils.formatDate(data.excavationTime, 'YYYY.MM.DD'),
        },
        {
          label: this.$t('marketClosePeriod'), // '封闭期',
          hidden: data.transCloseDays === 0,
          value: (
            <CellValue
              value={`${data.passTime}/${data.transCloseDays}`}
              unit={this.$t('day')}
            />
          ),
        },
        {
          label: this.$t('hashrateYesterdayNetOutput'), // '昨日净产出',
          value: (
            <CellValue
              value={bigNumberToFixed(data.yesterdayIncome || '0', 8)}
              unit={data.hashrateType}
            />
          ),
        },
      ];

      return listData.filter(({ hidden }) => !hidden);
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
      <div>
        <Row gutter={28} type="flex">
        {
          this.dataSource.map(item => {
            const isVipHashrate = item.type === VIP_HASHRATE;
            const header = (
              <ProductTitle
                className="card-product-title"
                chainType={item.hashrateType}
                leftExtra={item.productName}
                scopedSlots={{
                  name: () => (<span class='product-title-value'>{item.productTemplateName}</span>),
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
      </div>

    );
  },
};

export default Ordinary;
