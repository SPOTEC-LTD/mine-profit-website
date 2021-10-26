import { Row, Col, Spin, Progress } from 'ant-design-vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapState, mapActions } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import numberUtils from 'aa-utils/lib/numberUtils';
import findIndex from 'lodash/findIndex';
import levelBg from '@/assets/account/level-bg.png';
import levelLock from '@/assets/account/level-lock.png';
import levelUnLock from '@/assets/account/level-unlock.png';
import levelIconLock from '@/assets/account/level-icon-lock.png';
import levelUnlockBg from '@/assets/account/level-unlock-bg.png';
import { ACCOUNT, GET_ALL_LEVEL_INFO } from '@/modules/account/account';
import {
  getBonusTypeLabelMap,
  getBonusTypeNotificationMap,
  getBonusTypeIconMap,
} from '@/pages/Account/Detail/consts/getBonusType';
import conditionComplete from '@/assets/account/condition-complete.png';
import BonusTooltip from '../BonusTooltip';
import styles from './index.less?module';

const PromoteLevel = {
  data() {
    const _this = this;
    return {
      showRuleDetail: false,
      levelInfoList: [],
      levelSwiperOptions: {
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: '50%',
          slideShadows: false,
        },
        on: {
          slideChange() {
            _this.onSlideChange(this.activeIndex);
          },
        },
      },
      lockSwiperOptions: {
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true,
      },
      bonusList: [],
      conditionList: [],
      missionCompleted: true,
      isCurrentLevel: false,
    };
  },
  computed: {
    ...mapState({
      allLevelDetail: state => state.account.allLevelDetail,
      loading: state => state.loading.effects[`${ACCOUNT}/${GET_ALL_LEVEL_INFO}`],
    }),
    levelSwiperRef() {
      return this.$refs.levelSwiper.$swiper;
    },
    lockSwiperRef() {
      return this.$refs.lockSwiper.$swiper;
    },
    isShowBonus() {
      return !isEmpty(this.bonusList);
    },
    isShowUpCondition() {
      return !isEmpty(this.conditionList);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.levelSwiperRef.controller.control = this.lockSwiperRef;
      this.lockSwiperRef.controller.control = this.levelSwiperRef;
    });
    this[GET_ALL_LEVEL_INFO]().then(() => {
      const { levelInfoList, currentUserLevel } = this.allLevelDetail;
      const currentIndex = findIndex(levelInfoList, item => item.level === currentUserLevel);
      this.$nextTick(() => {
        this.levelSwiperRef.slideTo(currentIndex, 1000, false);
      });
      this.bonusList = levelInfoList[0].buffList;
      this.conditionList = levelInfoList[0].ruleList;
      this.isCurrentLevel = levelInfoList[0].level === currentUserLevel;
    });
  },
  methods: {
    ...mapActions(ACCOUNT, [GET_ALL_LEVEL_INFO]),
    onSlideChange(index) {
      const { levelInfoList, currentUserLevel } = this.allLevelDetail;
      this.bonusList = levelInfoList[index].buffList;
      this.conditionList = levelInfoList[index].ruleList;
      this.isCurrentLevel = levelInfoList[index].level === currentUserLevel;
      this.missionCompleted = true;
    },
  },
  render() {
    const { currentUserLevel, levelInfoList } = this.allLevelDetail;

    return (
      <Spin spinning={this.loading}>
        <div class={styles.wrapper}>
          <div class={styles['swiper-wrap']}>
            <Swiper class={styles['lock-swiper']} ref="lockSwiper" options={this.lockSwiperOptions}>
              {levelInfoList.map(item => {
                const isLock = item.level > currentUserLevel;

                return (
                  <SwiperSlide>
                    <div
                      class={[
                        styles['level-lock-wrap'],
                        { [styles['only-one-level']]: levelInfoList.length === 1 },
                      ]}
                    >
                      <img class={styles['level-lock']} src={isLock ? levelLock : levelUnLock} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper ref="levelSwiper" options={this.levelSwiperOptions}>
              {levelInfoList.map(item => {
                const isLock = item.level > currentUserLevel;
                const isCurrentLevel = item.level === currentUserLevel;

                return (
                  <SwiperSlide>
                    <div class={styles['level-item-box']}>
                      <div class={styles['level-item']}>
                        <img class={styles['level-bg']} src={isLock ? levelBg : levelUnlockBg} alt="" />
                        <div class={[styles['level-icon-box']]}>
                          <img
                            class={[styles['level-icon'], { [styles['icon-lock']]: isLock }]}
                            src={item.icon}
                            alt=""
                          />
                          {isLock && <img class={styles['level-icon-lock']} src={levelIconLock} alt="" />}
                        </div>
                        <div class={[styles['level-info-box'], { [styles['only-level-info']]: !isCurrentLevel }]}>
                          <span class={styles['level-info']}>{`Lv${item.level}:${item.name}`}</span>
                          {isCurrentLevel && (
                            <span class={styles['current-level']}>{this.$t('currentLevel')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div class={styles.content}>
            {this.isShowBonus && (
              <div
                class={[
                  styles['bonus-wrap'],
                  { [styles['mission-completed']]: this.missionCompleted || this.isCurrentLevel },
                ]}
              >
                <Row type="flex">
                  {this.bonusList.map((item, index) => {
                    const bonusValue = numberUtils.formatPercent(item.val, { minimumFractionDigits: 2 });
                    return (
                      <Col key={index} span={5}>
                        <BonusTooltip
                          word={bonusValue}
                          text={getBonusTypeNotificationMap(bonusValue)[item.type]}
                          label={getBonusTypeLabelMap()[item.type]}
                        >
                          <div class={styles['bonus-item']}>
                            <img src={getBonusTypeIconMap()[item.type]} alt="" />
                            <div class={styles['bonus-item-content']}>
                              <div>
                                <div class={styles['bonus-value']}>{bonusValue}</div>
                              </div>
                              <span>{getBonusTypeLabelMap()[item.type]}</span>
                            </div>
                          </div>
                        </BonusTooltip>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            )}
            {this.isShowUpCondition && (
              <div class={styles['up-conditions-wrap']}>
                <div class={styles['up-conditions-title']}>{this.$t('upConditions')}</div>
                <div class={styles['up-conditions-box']}>
                  {this.conditionList.map(item => {
                    const complete = +item.used >= +item.ruleValue;
                    const percentage = complete ? 100 : (item.used / item.ruleValue) * 100;
                    if (!complete) {
                      this.missionCompleted = false;
                    }

                    return (
                      <div class={styles['condition-item']}>
                        <div class={styles['condition-text']}>{item.title}</div>
                        {complete ? (
                          <div class={styles['condition-complete']}>
                            <span>{this.$t('completed')}</span>
                            <img class={styles['condition-complete-icon']} src={conditionComplete} alt="" />
                          </div>
                        ) : (
                          <div class={styles['condition-schedule']}>
                            <div>
                              <span class={styles['condition-value']}>{item.used}</span>
                              <span>{`/${item.ruleValue}`}</span>
                            </div>
                            <Progress strokeColor="#02A6E3" strokeWidth={3} showInfo={false} percent={percentage} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Spin>
    );
  },
};

export default PromoteLevel;
