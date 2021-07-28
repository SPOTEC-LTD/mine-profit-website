import { mapState, mapActions } from 'vuex';
import { Table } from 'ant-design-vue';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';

// import { accountSettingPath } from '@/router/consts/urls';
import { HASH_RATE_COUPONS, GET_COUPONS } from '@/modules/hashRateCoupons';
import { FOREVER } from '@/shared/consts/validPeriodStatus';
import { COUPON_ALL, getCouponsTypesList } from '@/shared/consts/couponsTypes';
import { ALL_STATUS, EXPIRE, getCouponsStatus } from '@/shared/consts/couponUsedStatus';
import dateUtils from '@/shared/intl/utils/dateUtils';
import BaseContainer from '@/shared/components/BaseContainer';
import InfoTooltip from '@/shared/components/InfoTooltip';
import Select from '@/shared/components/Select';

import { getExpiredReason } from './consts/causeOfFailure';
import CouponChooseModal from './CouponChooseModal'; // TODO: 待删

import styles from './index.less?module';

const dateFormat = 'YYYY.MM.DD';
const dateTimeFormat = `${dateFormat} HH:mm`;

const HashRateCoupons = {
  data() {
    return {
      couponsStatus: ALL_STATUS,
      couponId: null, // TODO: 待删
      couponName: '', // TODO: 待删
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
        hashrateCouponEnum: this.couponsStatus || null,
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

    // TODO: 待删
    handleCouponChange(couponInfo = {}) {
      const { couponId, couponName } = couponInfo;
      this.couponId = couponId;
      this.couponName = couponName;
    },
  },

  render() {
    const columns = [
      {
        title: this.$t('receiveTime'),
        dataIndex: 'coin',
        align: 'center',
        width: 170,
        customRender: (_, { createTime }) => dateUtils.formatDateTime(createTime, dateTimeFormat),
      },
      {
        title: this.$t('couponName'),
        dataIndex: 'name',
        align: 'center',
        ellipsis: true,
        customRender: (_, { name }) => {
          return (
            <InfoTooltip
              content={name}
              trigger='click'
            >
              <div class={styles['tooltip-name']}>{name}</div>
            </InfoTooltip>
          );
        },
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
        customRender: (_, { status, expirationReason }) => {
          return (
            <div class={styles['status-box']}>
              <div class={{ [styles['color-red']]: status === EXPIRE }}>{getCouponsStatus(status)}</div>
              {status === EXPIRE && (
                <InfoTooltip trigger='click' content={getExpiredReason(expirationReason)}>
                  <InfoCircleFilled />
                </InfoTooltip>
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
          {/* TODO: 模态框 待删 */}
          <CouponChooseModal
            list={this.couponsList}
            usesCouponId={this.couponId}
            onCouponChange={this.handleCouponChange}
          >
            点我{this.couponId}{this.couponName}
          </CouponChooseModal>
          {/* TODO: 面包屑 待加 */}
          <Select
            class={styles['hashrate-status-select']}
            defaultValue={COUPON_ALL}
            onChange={this.changeCouponsStatus}
          >
            {getCouponsTypesList().map(({ name, value }, index) => (
              <Select.Option
                key={index}
                value={value}
              >
                {name}
              </Select.Option>
            ))}
          </Select>
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
