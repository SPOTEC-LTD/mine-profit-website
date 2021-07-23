import { mapState, mapActions } from 'vuex';
import { Table, Dropdown, Menu } from 'ant-design-vue';

// import { accountSettingPath } from '@/router/consts/urls';
import { HASH_RATE_COUPONS, GET_COUPONS } from '@/modules/hashRateCoupons';
import { SOURCE_HASH_RATE_COUPONS } from '@/shared/consts/entryPageModes';
import dateUtils from '@/shared/intl/utils/dateUtils';
import BaseContainer from '@/shared/components/BaseContainer';
import ToolTipWrap from '@/shared/components/ToolTipWrap';

import { FOREVER } from './consts/validPeriodStatus';
import { ALL, EXPIRE, getCouponsStatus } from './consts/couponUsedStatus';
import { getCouponsTypesList, getCouponsTypes } from './consts/couponsTypes';
import { getExpiredReason } from './consts/causeOfFailure';

import styles from './index.less?module';

const dateFormat = 'YYYY.MM.DD';
const dateTimeFormat = `${dateFormat} HH:mm`;

const HashRateCoupons = {
  data() {
    return {
      couponsStatus: ALL,
    };
  },
  computed: mapState({
    couponsList: state => state.hashRateCoupons.couponsList,
    getListLoading: state => state.loading.effects[`${HASH_RATE_COUPONS}/${GET_COUPONS}`],

  }),

  mounted() {
    this.getCouponsList();
  },

  methods: {
    ...mapActions(HASH_RATE_COUPONS, [GET_COUPONS]),

    getCouponsList() {
      const data = {
        type: SOURCE_HASH_RATE_COUPONS,
        hashrateCouponEnum: this.couponsStatus,
      };
      this[GET_COUPONS](data);
    },

    finallyCouponsList() {
      return this.couponsList.map((item, index) => {
        return { key: index, ...item };
      });
    },

    changeCouponsStatus(value) {
      this.couponsStatus = value;
      this.getCouponsList();
    },
  },

  render() {
    const columns = [
      {
        title: this.$t('receiveTime'),
        dataIndex: 'coin',
        align: 'center',
        width: 170,
        // TODO: 待添加'获得时间'字段
        customRender: (_, { createTime }) => dateUtils.formatDateTime(createTime, dateTimeFormat),
      },
      {
        title: this.$t('couponName'),
        dataIndex: 'name',
        align: 'center',
        ellipsis: true,
      },
      {
        title: this.$t('termOfValidity'),
        dataIndex: 'validEndTime',
        align: 'center',
        width: 200,
        customRender: (_, { validPeriodStatus, validStartTime, validEndTime }) => {
          const getFormatTime = () => (
            `${dateUtils.formatDateTime(validStartTime, dateFormat)}-${dateUtils.formatDateTime(validEndTime, dateFormat)}`
          );
          const finallyTimeString = validPeriodStatus !== FOREVER
            ? getFormatTime()
            : this.$t('permanent');
          return finallyTimeString;
        },
      },
      {
        title: this.$t('status'),
        dataIndex: 'status',
        align: 'center',
        width: 100,
        // TODO: 待添加'失效原因'字段
        customRender: (_, { status, shutdownReason }) => {
          return (
            <div class={styles['status-box']}>
              <div class={{ [styles['color-red']]: status === EXPIRE }}>{getCouponsStatus(status)}</div>
              {status === EXPIRE && (
                <ToolTipWrap
                  className={styles['icon-tooltip']}
                  title={'getExpiredReason(shutdownReason)'}
                />
              )}
            </div>
          );
        },
      },
      {
        title: this.$t('hashNum'),
        dataIndex: 'eachAmount',
        align: 'center',
        width: 100,
        customRender: (_, { eachAmount, unit }) => {
          return `${eachAmount}${unit}`;
        },
      },
      {
        title: this.$t('hashType'),
        dataIndex: 'hashrateType',
        align: 'center',
        width: 100,
      },
      {
        title: this.$t('couponsOutPutTime'),
        dataIndex: 'validity',
        align: 'center',
        width: 100,
        customRender: (_, { validity }) => {
          return `${validity}${this.$t('day')}`;
        },
      },
      {
        title: this.$t('useLimit'),
        dataIndex: 'useLimitation',
        align: 'center',
        width: 170,
        customRender: (_, { useLimitation, unit }) => {
          return `${this.$t('couponUseLimit')}${useLimitation}${unit}`;
        },
      },
    ];
    return (
      <div class={styles['hashrate-coupons-box']}>
        <BaseContainer>
          {/* TODO: 面包屑 待加 */}
          {/* TODO: 下拉框 待换 */}
          <Dropdown
            trigger={['click']}
            overlayClassName="hashrate-overlay"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            overlay={(
              <Menu onClick={({ key }) => this.changeCouponsStatus(key)}>
                {getCouponsTypesList().map(({ name, value }) => (
                  <Menu.Item key={value}>
                    {name}
                  </Menu.Item>
                ))}
              </Menu>
            )}
          >
            <Dropdown.Button class={styles['hashrate-status-dropdown']}>
              {getCouponsTypes(this.couponsStatus)}
            </Dropdown.Button>
          </Dropdown>
          <Table
            rowClassName={({ status }) => (status === EXPIRE ? styles['gray-row'] : '')}
            columns={columns}
            dataSource={this.finallyCouponsList()}
            loading={this.getListLoading}
            pagination={false}
          />
        </BaseContainer>
      </div>
    );
  },
};

export default HashRateCoupons;
