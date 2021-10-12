import { Table } from 'ant-design-vue';
import { mapState, mapActions } from 'vuex';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';
import Select from '@/shared/components/Select';
import {
  REBATE_REWARD,
  DIRECT_OUTPUT,
  DIRECT_BUY,
  INDIRECT_BUY,
  INDIRECT_OUTPUT,
} from '@/shared/consts/inviteType';
import { ACCOUNT, GET_INVITE_DETAIL_INFO } from '@/modules/account/account';
import { PROXY } from './consts/promoteType';
import styles from './index.less?module';

const InviteDetail = {
  computed: {
    ...mapState({
      inviteDetailInfo: state => state.account.inviteDetailInfo,
      loading: state => state.loading.effects[`${ACCOUNT}/${GET_INVITE_DETAIL_INFO}`],
    }),
  },
  mounted() {
    this[GET_INVITE_DETAIL_INFO]({ sort: REBATE_REWARD });
  },
  methods: {
    ...mapActions(ACCOUNT, [GET_INVITE_DETAIL_INFO]),
    onSelectChange(value) {
      this[GET_INVITE_DETAIL_INFO]({ sort: value });
    },
  },
  render() {
    const { list, type } = this.inviteDetailInfo;
    const columns = [
      {
        title: this.$t('inviteCustomers'),
        dataIndex: 'registerAccount',
        align: 'center',
        customRender: (value, { avatar, nickName }) => {
          return (
            <div class={styles['user-info-wrap']}>
              <div class={styles['user-info-box']}>
                <img src={avatar || defaultAvatar} alt="" />
                <div class={styles['user-info']}>
                  <span>{value}</span>
                  <span>{nickName}</span>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        title: `${this.$t('rebateRewardTotal')}（USDT）`,
        dataIndex: 'inviteReward',
        align: 'center',
        customRender: value => {
          return <div class={styles['reward-box']}>{bigNumberToFixed(value, 8)}</div>;
        },
      },
      {
        title: `${this.$t('directOutputReward')}（USDT）`,
        dataIndex: 'directReward',
        align: 'center',
        customRender: value => {
          return <div class={styles['reward-box']}>{bigNumberToFixed(value, 8)}</div>;
        },
      },
      {
        title: `${this.$t('indirectOutputReward')}（USDT）`,
        dataIndex: 'indirectReward',
        align: 'center',
        customRender: value => {
          return <div class={styles['reward-box']}>{bigNumberToFixed(value, 8)}</div>;
        },
      },
      ...(type === PROXY
        ? [
          {
            title: `${this.$t('directBuyRebate')}（USDT）`,
            dataIndex: 'directBuyReward',
            align: 'center',
            customRender: value => {
              return <div class={styles['reward-box']}>{bigNumberToFixed(value, 8)}</div>;
            },
          },
          {
            title: `${this.$t('indirectBuyRebate')}（USDT）`,
            dataIndex: 'indirectBuyReward',
            align: 'center',
            customRender: value => {
              return <div class={styles['reward-box']}>{bigNumberToFixed(value, 8)}</div>;
            },
          },
        ]
        : []),
    ];

    const sortTypeList = [
      { text: this.$t('rebateRewardSort'), value: REBATE_REWARD },
      { text: this.$t('directOutputRewardSort'), value: DIRECT_OUTPUT },
      { text: this.$t('indirectOutputRewardSort'), value: INDIRECT_OUTPUT },
      ...(type === PROXY
        ? [
            { text: this.$t('directBuyRebateSort'), value: DIRECT_BUY },
            { text: this.$t('indirectBuyRebateSort'), value: INDIRECT_BUY },
          ]
        : []),
    ];

    return (
      <div class={styles.wrapper}>
        <div class={styles['select-wrap']}>
          <Select
            onChange={this.onSelectChange}
            defaultValue={REBATE_REWARD}
            suffixIcon={<TriangleFilled className="select-icon" />}
            dropdownMatchSelectWidth={false}
          >
            {sortTypeList.map(({ value, text }) => (
              <Select.Option key={value} label={text}>
                {text}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Table
          class="blue-table"
          rowKey={record => record.id}
          columns={columns}
          dataSource={list}
          loading={this.loading}
        />
      </div>
    );
  },
};

export default InviteDetail;
