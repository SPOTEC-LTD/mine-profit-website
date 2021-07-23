import { Row, Col } from 'ant-design-vue';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import ProductTitle from '@/shared/components/ProductTitle';
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
  data() {
    return {
      isVisibleTransferPage: false,
      nowClickData: {},
    };
  },
  methods: {
    getListData(data) {
      const isVipHashrate = data.type === VIP_HASHRATE;

      const listData = [
        {
          label: this.$t('ratioDialogRatio'),
          value: <ProportionCellValue data={data} />,
        },
        {
          label: this.$t('hashrateBuff'),
          hidden: isVipHashrate,
          value: (<HashrateBuffCellValue data={data} />),
        },
        {
          label: this.$t('hashrateYesterdayNetOutput'),
          value: <CellValue value={bigNumberToFixed(data.yesterdayOutput, 8)} unit={data.hashrateType} />,
        },
        {
          label: this.$t('hashrateTodayNetOutputPre'),
          value: <CellValue value={bigNumberToFixed(data.todayExpectedOutput || 0, 8)} unit={data.hashrateType} />,
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
      <Row gutter={28} type="flex">
        {
          this.dataSource.map(item => {
            const isVipHashrate = item.type === VIP_HASHRATE;
            const header = (
              <ProductTitle
                className="card-product-title"
                chainType={item.hashrateType}
                leftExtra={isVipHashrate && item.name}
                scopedSlots={{
                  name: () => (
                    isVipHashrate
                      ? <span>{this.$t('hashrateVIPHash')}</span>
                      : <span class={['product-title-value']}>{item.name}</span>
                  ),
                }}
                onHandleClick={() => { this.onClickToProductTemplate(item.productTemplateId, isVipHashrate); }}
              />
            );

            return (
              <Col span={8}>
                <Card
                  scopedSlots={{
                    header: () => header,
                    footer: () => <CardFooter data={item} isVipHashrate={isVipHashrate} />,
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

export default Ordinary;
