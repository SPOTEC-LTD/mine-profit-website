// import { CountDown } from 'vant';
import {
  SquareSwitchOutlined,
  SquareLockOutlined,
} from 'ahoney/lib/icons';
// import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import DateUtils from '@/shared/intl/utils/dateUtils';
import ProportionCellValue from '@/pages/Account/HashRate/List/components/ProportionCellValue';
// import HashrateBuffCellValue from '@/pages/Account/HashRate/List/components/HashrateBuffCellValue';
import Card from '@/pages/Account/components/Card';
import ListCell from '@/pages/Account/components/ListCell';
// import CellValue from '@/pages/Account/components/CellValue';
import { pledgeHashratePath, officialProductTemplatePath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import { VIP_HASHRATE } from '@/pages/Account/HashRate/consts/hashrateType';
import {
  HASHRATE_ENOUGH,
  HASHRATE_NO_ENOUGH,
  HASHRATE_NUMBER_NO_ENOUGH,
} from '@/pages/Account/HashRate/consts/hashrateAmountType';
import { ORDINARY } from '@/pages/Account/HashRate/consts/pledgeSourceType';

import styles from './index.less?module';

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
        // {
        //   label: this.$t('hashrateBuff'),
        //   hidden: isVipHashrate,
        //   value: (<HashrateBuffCellValue data={data} />),
        // },
        // {
        //   label: this.$t('hashrateYesterdayNetOutput'),
        //   value: <CellValue value={bigNumberToFixed(data.yesterdayOutput, 8)} unit={data.hashrateType} />,
        // },
        // {
        //   label: this.$t('hashrateTodayNetOutputPre'),
        //   value: <CellValue value={bigNumberToFixed(data.todayExpectedOutput || 0, 8)} unit={data.hashrateType} />,
        // },
      ];

      return listData.filter(({ hidden }) => !hidden);
    },

    pledgeAction({ isPledge, productTemplateId, hashrateType }) {
      if (isPledge === HASHRATE_ENOUGH) {
        locationServices.push(pledgeHashratePath, {
          params: { productTemplateId },
          query: { source: ORDINARY, hashrateType },
        });
        return;
      }

      const pledgeMessageMap = {
        [HASHRATE_NO_ENOUGH]: this.$t('hashratePledgeAllNotEnough'),
        [HASHRATE_NUMBER_NO_ENOUGH]: this.$t('hashratePledgeSameNotEnough'),
      };

      // Toast({
      //   message: pledgeMessageMap[isPledge],
      //   icon: 'warning-o',
      //   duration: 1000,
      // });
    },

    getVipHashrateNameNode() {
      return (
        <span>
          <span>{this.$t('hashrateVIPHash')}</span>
          <span class={styles.present}>{this.$t('present')}</span>
        </span>
      );
    },

    getVipHashrateFooter(data) {
      const startDate = DateUtils.formatDate(data.startTime, 'YYYY.MM.DD');
      const endDate = DateUtils.formatDate(data.endTime, 'YYYY.MM.DD');
      const format = this.$t('remainTime', {
        day: 'DD',
        hour: 'HH',
        minute: 'mm',
        second: 'ss',
      });
      return (
        <div class={styles['vip-hashrate-footer']}>
          {
            data.remainTime ? (
              <div>
                计时器
                {/* <CountDown
                  time={data.remainTime * 1000}
                  format={format}
                  onFinish={() => this.$emit('refresh')}
                /> */}
              </div>
            ) : (
              <div class={styles['vip-hashrate-footer-time']}>
                <span>{this.$t('outPutTime')}</span>
                <span>{`${startDate}-${endDate}`}</span>
              </div>
            )
          }
        </div>
      );
    },
    closeTransferPage(to) {
      if (to) {
        this.$emit('toTransferPage');
      }
      this.isVisibleTransferPage = false;
      document.title = this.$t('mineTitleHashrate');
    },

    onClickToProductTemplate(ptId, isVipHashrate) {
      const currentFullPath = this.$router.history.current.fullPath;
      if (!isVipHashrate) {
        locationServices.push(
          officialProductTemplatePath,
          { params: { id: ptId }, query: { redirectHashRateUrl: currentFullPath } },
        );
      }
    },
  },

  render() {
    return (
      <div>
        {
          this.dataSource.map(item => {
            return (
              <Card
                className="normal-card"
              >
                <ListCell dataSource={this.getListData(item)} />
              </Card>
            );
          })
        }
      </div>

    );
  },
};

export default Ordinary;
