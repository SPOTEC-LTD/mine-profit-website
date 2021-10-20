import { Carousel } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import { rankPath, platformCurrencyPaths } from '@/router/consts/urls';
import { ACTIVITY, GET_ACTIVITY_LIST } from '@/modules/activity';
import locationServices from '@/shared/services/location/locationServices';
import decorationLeftImg from '@/assets/activity/decorationLeftImg.png';
import decorationRightImg from '@/assets/activity/decorationRightImg.png';
import { ACTIVITY_DONE } from './consts/activityStatus';
import { URL_TYPE, H5_CONTENT, PRE_SET } from './consts/activityType';
import styles from './index.less?module';

const Activity = {
  data() {
    return {
      currentImg: 0,
      activityData: [
        // TODO 后续加上对应的id和path
        { id: 8, to: rankPath },
        { id: 6, to: rankPath },
        { id: 2, to: rankPath },
        { id: 4, to: platformCurrencyPaths },
      ],
    };
  },

  mounted() {
    this[GET_ACTIVITY_LIST]();
  },

  computed: {
    ...mapState({ activityList: state => state.activity.activityList }),

    activityDataList() {
      const resultList = this.activityList.map(item => {
        let activityPath;
        if (item.linkType === URL_TYPE) {
          activityPath = item.linkUrl;
        } else if (item.linkType === H5_CONTENT || item.linkType === PRE_SET) {
          const [localPath] = this.activityData.filter(data => data.id === item.id);
          activityPath = localPath ? localPath.to : '';
        }
        item.to = activityPath;
        return item;
      });
      return resultList;
    },
  },

  methods: {
    ...mapActions(ACTIVITY, [GET_ACTIVITY_LIST]),

    linkToActivity(to, status) {
      if (!to || status === ACTIVITY_DONE) { return; }
      locationServices.push(to);
    },

    getDisplayIndex(from, to) {
      this.currentImg = to;
      this.$refs.controller.scrollTop = 80 * to;
    },

    goTo(index) {
      this.$refs.carousel.goTo(index);
    },
  },

  render() {
    return (
      <div class={styles['activity-wrapper']}>
        <div class={styles['activity-container']}>
          <img src={decorationLeftImg} alt="" class={styles['decoration-left-img']} />
          <img src={decorationRightImg} alt="" class={styles['decoration-right-img']} />
          <div class={styles['activity-content']}>
            <div class={styles['carousel-wrapper']}>
              <Carousel
                effect="fade"
                dots={false}
                beforeChange={this.getDisplayIndex}
                ref="carousel"
                autoplay
              >
                {this.activityDataList.map((item, index) => (
                  <div
                    class={styles['img-box']}
                    onClick={() => { this.linkToActivity(item.to, item.activityStatus); }}
                  >
                    <img
                      src={item.webImage}
                      alt=""
                      key={index}
                      class={{ [styles['disabled-banner']]: item.activityStatus === ACTIVITY_DONE }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div class={styles['activity-chooser-wrapper']} ref="controller">
              <div class={styles['activity-chooser-container']}>
                {this.activityDataList.map((item, index) => (
                  <div class={[styles['little-img-wrapper'], { [styles['chooses-wrapper']]: this.currentImg === index }]}>
                    <img
                      src={item.webImage}
                      alt=""
                      key={index}
                      class={[styles['little-img'], { [styles['chooses-img']]: this.currentImg === index }]}
                      onClick={() => { this.goTo(index); }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default Activity;
