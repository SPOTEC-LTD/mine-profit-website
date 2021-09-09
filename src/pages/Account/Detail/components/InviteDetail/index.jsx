import { Table } from 'ant-design-vue';
import { mapState, mapActions } from 'vuex';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';
import { ACCOUNT, GET_INVITE_DETAIL_LIST } from '@/modules/account/account';
import styles from './index.less?module';

const InviteDetail = {
  computed: {
    ...mapState({
      inviteDetailList: state => state.account.inviteDetailList,
      loading: state => state.loading.effects[`${ACCOUNT}/${GET_INVITE_DETAIL_LIST}`],
    }),
  },
  mounted() {
    this[GET_INVITE_DETAIL_LIST]({ sort: 1 });
  },
  methods: {
    ...mapActions(ACCOUNT, [GET_INVITE_DETAIL_LIST]),
  },
  render() {
    const columns = [
      {
        title: this.$t('inviter'),
        dataIndex: 'registerAccount',
        align: 'center',
        ellipsis: true,
        customRender: (value, { avatar }) => {
          return (
            <div class={styles['user-info-box']}>
              <img src={avatar || defaultAvatar} alt="" />
              <span>{value}</span>
            </div>
          );
        },
      },
      {
        title: this.$t('nickname'),
        dataIndex: 'nickName',
        align: 'center',
        ellipsis: true,
        customRender: name => {
          return <span>{name}</span>;
        },
      },
      {
        title: this.$t('awardAmount'),
        dataIndex: 'inviteReward',
        align: 'center',
        customRender: value => {
          return (
            <div class={styles['reward-box']}>
              <span>{bigNumberToFixed(value, 8)}</span>
              <span>USDT</span>
            </div>
          );
        },
      },
    ];
    return (
      <div class={styles.wrapper}>
        <Table
          class="blue-table"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.inviteDetailList}
          loading={this.loading}
        />
      </div>
    );
  },
};

export default InviteDetail;
