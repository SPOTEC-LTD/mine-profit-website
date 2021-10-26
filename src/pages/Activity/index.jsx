import { mapActions, mapState } from 'vuex';
import locationHelp from '@/shared/utils/locationHelp';
import BlockTitle from '@/shared/components/BlockTitle';
import BaseContainer from '@/shared/components/BaseContainer';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import { ACTIVITY, GET_ACTIVITY_LIST } from '@/modules/activity';
import closedTitleImage from '@/assets/activity/closed-title.png';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import progressTitleImage from '@/assets/activity/progress-title.png';
import { PROMOTE_RULE } from '@/pages/Account/Detail/consts/tabsActiveValue';
import { rankPath, platformCurrencyPaths, activityContentPath, accountDetailPath } from '@/router/consts/urls';
import BannerList from './BannerList';
import { INVITE_FRIENDS } from './consts/activityPreSetType';
import { URL_TYPE, H5_CONTENT, PRE_SET } from './consts/activityType';
import { ACTIVITY_DONE, ACTIVITY_PROGRESSING } from './consts/activityStatus';

import styles from './index.less?module';

const Activity = {
  data() {
    return {
      currentImg: 0,
      activityData: [
        // TODO 后续加上对应的type和path
        { type: 1, to: rankPath }, // 排行榜
        { type: 2, to: accountDetailPath }, // 邀请好友
        { type: 3, to: rankPath }, // 新手三重福利
        { type: 4, to: platformCurrencyPaths }, // 算力买一赠一
      ],
      isChinese: getIsChinese(),
    };
  },

  mounted() {
    this[GET_ACTIVITY_LIST]();
  },

  computed: {
    ...mapState({ activityList: state => state.activity.activityList }),

    inProgressList() {
      const resultList = this.getPathList(this.activityList);
      return resultList.filter(item => item.activityStatus === ACTIVITY_PROGRESSING);
    },

    closedList() {
      const resultList = this.getPathList(this.activityList);
      return resultList.filter(item => item.activityStatus === ACTIVITY_DONE);
    },
  },

  methods: {
    ...mapActions(ACTIVITY, [GET_ACTIVITY_LIST]),

    getPathList(list = []) {
      const resultList = list.map(item => {
        let activityPath = '';
        if (item.linkType === URL_TYPE) {
          // urlType 跳转返回url
          activityPath = item.linkUrl;
        } else if (item.linkType === PRE_SET) {
          // 预设 跳转内部路径
          const [localPath] = this.activityData.filter(data => data.type === item.type);
          activityPath = localPath ? localPath.to : '';
        } else if (item.linkType === H5_CONTENT) {
          // h5内容 跳转展示h5内容
          activityPath = activityContentPath;
        }
        item.to = activityPath;
        return item;
      });
      return resultList;
    },

    linkToActivity({ id, path, linkType, type }) {
      if (!path) { return; }
      if (linkType === URL_TYPE) {
        window.open(path);
      } else if (linkType === H5_CONTENT) {
        const { userId = 'null' } = getUserInfoFunc();
        locationHelp.open(path, { params: { userId, id } });
      } else {
        let pathParams = {};
        if (type === INVITE_FRIENDS) {
          pathParams = { query: { inviteModelActiveKey: PROMOTE_RULE } };
        }
        locationHelp.open(path, pathParams);
      }
    },
  },

  render() {
    return (
      <div class={styles['activity-wrapper']}>
        <div class={styles['activity-list']}>
          <BaseContainer>
            <div class={styles['in-progress-list']}>
              <BlockTitle
                img={progressTitleImage}
                class={[styles['list-title'], styles['progress-title']]}
                title={this.isChinese && this.$t('progressActivity')}
              />
              <BannerList
                className={styles['data-list']}
                dataList={this.inProgressList}
                onHandleClick={this.linkToActivity}
              />
            </div>
            <div class={styles['closed-list']}>
              <BlockTitle
                img={closedTitleImage}
                class={styles['list-title']}
                title={this.isChinese && this.$t('closedActivity')}
              />
              <BannerList
                className={styles['data-list']}
                dataList={this.closedList}
                onHandleClick={this.linkToActivity}
              />
            </div>
          </BaseContainer>
        </div>
      </div>
    );
  },
};

export default Activity;
