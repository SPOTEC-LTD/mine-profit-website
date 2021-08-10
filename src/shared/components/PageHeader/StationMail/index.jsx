import { mapState, mapActions, mapMutations } from 'vuex';
import { Popover, Tabs } from 'ant-design-vue';
import MailFilled from 'ahoney/lib/icons/MailFilled';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';

import {
  STATION_MAIL, GET_STATION_MAIL_LIST, MAIL_READ_DETAIL, RESET_STATE,
} from '@/modules/stationMail';
import { mailAllRead } from '@/api/stationMail';
import scrollEvent from '@/shared/utils/scrollEvent';
import dateUtils from '@/shared/intl/utils/dateUtils';

import { UNREAD, READ } from './readStatus';
import List from './List';

import styles from './index.less?module';

const { TabPane } = Tabs;
const StationMail = {
  data() {
    return {
      activeTab: this.$route.query.readStatus || UNREAD,
      isMailDetail: false,
      isShowAllReadNode: false,
      pageNum: 1,
      noData: false,
      loading: true,
      fetching: false,
      mailInfo: {},
    };
  },

  computed: {
    ...mapState({
      stationMailList: state => state.stationMail.stationMailList,
      pageInfo: state => state.stationMail.pageInfo,
      getListLoading: state => state.loading.effects[`${STATION_MAIL}/${GET_STATION_MAIL_LIST}`],
    }),
  },

  mounted() {
    this.fetchStationMailList();
  },

  methods: {
    ...mapMutations(STATION_MAIL, [RESET_STATE]),
    ...mapActions(STATION_MAIL, [GET_STATION_MAIL_LIST, MAIL_READ_DETAIL]),

    fetchStationMailList(option = {}) {
      const { reset } = option;
      if (reset) {
        this[RESET_STATE]();
        this.pageNum = 1;
        this.fetching = false;
        this.noData = false;
      }
      if (this.fetching || this.noData) {
        return;
      }
      this.fetching = true;
      this[GET_STATION_MAIL_LIST]({
        // TODO: 待加字段 ’是否已读‘ this.activeTab
        pageNum: this.pageNum,
        pageSize: 10,
      }).then(() => {
        this.loading = false;
        this.noData = this.stationMailList.length === this.pageInfo.total;
        this.pageNum += 1;
        this.fetching = false;
      });
    },

    getPopoverTitle() {
      return (
        <div>
          {this.isShowAllReadNode && (
            <div class={styles.confirm}>
              <div
                class={styles['confirm-all-read']}
                onClick={this.onModalConfirm}
              >
                {this.$t('confirmAllRead')}
              </div>
              <div
                class={styles['confirm-cancel']}
                onClick={() => { this.isShowAllReadNode = false; }}
              >
                {this.$t('cancel')}
              </div>
              <div class={styles['confirm-icon']} />
            </div>
          )}
          <div class={styles['station-mail-title']}>
            <div class={{ [styles['detail-title']]: this.isMailDetail }}>
              {this.isMailDetail && (
                <RightOutlined
                  rotate={180}
                  onClick={() => {
                    this.isMailDetail = false;
                    this.fetchStationMailList({ reset: true });
                  }}
                />
              )}
              <div>{this.$t('drawerMessage')}</div>
            </div>
            {!this.isMailDetail && (
              <div
                class={styles['station-mail-all-read']}
                onClick={() => { this.isShowAllReadNode = true; }}
              >
                {this.$t('allRead')}
              </div>
            )}
          </div>
        </div>
      );
    },

    handleListScroll(target) {
      scrollEvent(this.fetchStationMailList, target, 40);
    },

    onTabsChange(activeKey) {
      this.activeTab = activeKey;
      this.fetchStationMailList({ reset: true });
      this.isShowAllReadNode = false;
    },

    showMailDetail(mailInfo) {
      this.isMailDetail = true;
      !mailInfo.read && this[MAIL_READ_DETAIL]({ id: mailInfo.id });
      this.mailInfo = mailInfo;
    },

    getPopoverContent() {
      const mailList = [
        { id: 'leftTab', key: UNREAD, tabName: this.$t('unread') },
        { id: 'rightTab', key: READ, tabName: this.$t('read') },
      ];

      const tabNode = (
        <Tabs
          class='mp-tabs-short'
          animated={false}
          tabBarGutter={0}
          activeKey={this.activeTab}
          onChange={this.onTabsChange}
        >
          {mailList.map(({ id, key, tabName }) => (
            <TabPane key={key} tab={tabName}>
              <List
                id={id}
                class={styles['mail-list']}
                list={this.stationMailList}
                loading={this.getListLoading}
                onListScroll={this.handleListScroll}
                onShowMailDetail={this.showMailDetail}
              />
            </TabPane>
          ))}
        </Tabs>
      );

      const { messageTitle, messageContent, sendTime } = this.mailInfo;

      const detailNode = (
        <div class={styles['mail-detail']}>
          <div class={styles['mail-detail-title']}>{messageTitle}</div>
          <div class={styles['mail-detail-time']}>
            {dateUtils.formatDateTime(sendTime, 'YYYY.MM.DD HH:mm')}
          </div>
          <div class={styles['mail-detail-main']}>{messageContent}</div>
        </div>
      );
      return this.isMailDetail ? detailNode : tabNode;
    },

    onModalConfirm() {
      mailAllRead()
        .then(() => {
          this.isShowAllReadNode = false;
          this.fetchStationMailList({ reset: true });
        });
    },

    visibleChange(visible) {
      if (visible) {
        this.isMailDetail = false;
        this.isShowAllReadNode = false;
      }
    },
  },

  render() {
    return (
      <div>
        <Popover
          overlayClassName={styles['station-mail']}
          placement='bottom'
          title={this.getPopoverTitle}
          content={this.getPopoverContent}
          onVisibleChange={this.visibleChange}
        >
          <div
            class={styles['email-box']}
          >
            <MailFilled className={styles.email} />
          </div>
        </Popover>
      </div>
    );
  },
};

export default StationMail;
