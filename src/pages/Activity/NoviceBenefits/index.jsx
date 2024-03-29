import { mapState, mapActions } from 'vuex';
import { Spin } from 'ant-design-vue';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { ACTIVITY, GET_HASH_MODAL_LIST } from '@/modules/activity';
import { getIsChinese, getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import { loginPath } from '@/router/consts/urls';
import * as activityAPI from '@/api/activity';
import noviceBenefits from '@/assets/noviceBenefits/novice_benefits.png';
import noviceBenefitsEn from '@/assets/noviceBenefits/novice_benefits_en.png';
import benefitsImg1 from '@/assets/noviceBenefits/benefits_img1.png';
import benefitsImg2 from '@/assets/noviceBenefits/benefits_img2.png';
import benefitsImg3 from '@/assets/noviceBenefits/benefits_img3.png';
import CopyToClipboard from '@/shared/components/CopyToClipboard';
import HashrateModal from '@/pages/home/component/HashrateModal';
import HashrateCouponModal from '@/pages/home/component/HashrateCouponModal';
import BaseContainer from '@/shared/components/BaseContainer';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import locationServices from '@/shared/services/location/locationServices';
import {
  NOT_FINISHED, COMPLETED, RECEIVED, CONDITION_ONE, CONDITION_TWO, CONDITION_THREE,
} from './completionStatus';
import styles from './index.less?module';

const loop = () => { };
const NoviceBenefits = {
  async asyncData(ctx) {
    const props = {
      noviceBenefitsInfo: {
        inviteCount: '0/0',
        kycCount: '0/0',
        registrationCount: '0/0',
        registrationStatus: NOT_FINISHED,
        inviteStatus: NOT_FINISHED,
        addCusServiceStatus: NOT_FINISHED,
      },
    };
    const getBenefitsInfoPromise = activityAPI.getBenefitsInfo({}, { ctx });
    try {
      const data = await getBenefitsInfoPromise;
      const { body: { userBenefitsMark } } = data;
      props.noviceBenefitsInfo = userBenefitsMark;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },
  data() {
    return {
      showShareQrCodeModal: false,
      showHashrateModal: false,
      modalIndex: 0,
      registrationLoading: false,
      inviteLoading: false,
      addOfficialLoading: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      hashModalList: state => state.activity.hashModalList,
      loading: state => state.loading.effects[`${ACTIVITY}/${GET_HASH_MODAL_LIST}`],
    }),
    noLogin() {
      return isEmpty(this.userInfo);
    },
  },
  methods: {
    ...mapActions(ACTIVITY, [GET_HASH_MODAL_LIST]),
    getOneConditionNode(registrationCount) {
      return (
        <div class={styles['condition-box']}>
          <div class={styles.condition}>{`${this.$t('completeRegistration')}: ${registrationCount}`}</div>
        </div>
      );
    },

    getTwoConditionNode({ inviteCount, kycCount }) {
      return (
        <div class={styles['condition-box']}>
          <div class={styles.condition}>{`${this.$t('drawerInviteFriend')}: ${inviteCount}`}</div>
          <div class={styles.condition}>{`${this.$t('inviteFriendsRealName')}: ${kycCount}`}</div>
        </div>
      );
    },

    getThreeConditionNode(weChat) {
      return (
        <div class={classNames(styles['condition-box'], styles['condition-three'])}>
          <div>
            <div>{this.$t('weChatCustomerService')}</div>
            <div class={styles['we-chat']}>{weChat}</div>
            <CopyToClipboard text={weChat || ''}>
              <div class={styles['we-chat-button']}>{this.$t('copy')}</div>
            </CopyToClipboard>
          </div>
          <div>
            <div>{this.$t('telegramCustomerService')}</div>
            {/* TODO: 点击前往Telegram客服，链接待改 */}
            <a href="https://telegram.org/dl">
              <div class={styles['telegram-button']}>
                {this.$t('clickGoOn')}
              </div>
            </a>
          </div>
        </div>
      );
    },

    getBenefitsList() {
      const {
        registrationStatus, inviteStatus, addCusServiceStatus,
        registrationCount, inviteCount, kycCount, weChat,
      } = this.noviceBenefitsInfo;
      const benefitsList = [
        {
          title: this.$t('completeRegistration'),
          tag: `${this.$t('welfare')}1`,
          subTitle: this.$t('experienceIsForce'),
          conditions: this.getOneConditionNode(registrationCount),
          describe: this.$t('welfareDesc1', { enProductName: this.$t('enProductName') }),
          image: benefitsImg1,
          status: registrationStatus,
          loading: this.registrationLoading,
        },
        {
          title: this.$t('drawerInviteFriend'),
          tag: `${this.$t('welfare')}2`,
          subTitle: this.$t('experienceIsForce'),
          conditions: this.getTwoConditionNode({ inviteCount, kycCount }),
          describe: this.$t('welfareDesc2', { enProductName: this.$t('enProductName') }),
          image: benefitsImg2,
          status: inviteStatus,
          loading: this.inviteLoading,
        },
        {
          title: this.$t('addOfficialService'),
          tag: `${this.$t('welfare')}3`,
          subTitle: this.$t('experienceIsForce'),
          conditions: this.getThreeConditionNode(weChat),
          describe: this.$t('welfareDesc3'),
          image: benefitsImg3,
          status: addCusServiceStatus,
          loading: this.addOfficialLoading,
        },
      ];

      return benefitsList;
    },

    toInvitePage() {
      if (this.noLogin) {
        this.toSignPage();
      } else {
        this.showShareQrCodeModal = true;
      }
    },

    getTaskCompletionMap(index, status) {
      const benefitsMap = {
        [CONDITION_ONE]: { text: this.$t('sign'), on: this.toSignPage, color: 'brown-button' },
        [CONDITION_TWO]: { text: this.$t('invite'), on: this.toInvitePage, color: 'brown-button' },
        [CONDITION_THREE]: { text: this.$t('uncompleted'), on: loop, color: 'gray-button' },
      };
      const statusMap = {
        [NOT_FINISHED]: benefitsMap[index],
        [COMPLETED]: { text: this.$t('draw'), on: () => this.openHashRateModal(index), color: 'brown-button' },
        [RECEIVED]: { text: this.$t('alreadyReceived'), on: loop, color: 'gray-button' },
      };

      return statusMap[status];
    },

    toSignPage() {
      const currentFullPath = this.$router.history.current.fullPath;
      locationServices.push(loginPath, { query: { redirectUrl: currentFullPath } });
    },

    openHashRateModal(index) {
      const benefitsTypeList = [
        'REGISTRATION_SUCCESS', 'INVITE_FRIENDS', 'ADD_CUSTOMER_SERVICE_STAFF',
      ];
      const loadingKeys = [
        'registrationLoading', 'inviteLoading', 'addOfficialLoading',
      ];
      this[loadingKeys[index]] = true;
      this[GET_HASH_MODAL_LIST]({ benefitsType: benefitsTypeList[index] })
        .then(() => {
          this.showHashrateModal = true;
          this[loadingKeys[index]] = false;
        })
        .catch(err => {
          console.log(err);
          this[loadingKeys[index]] = false;
        });
    },

    getModalListNode() {
      const popUpModal = this.hashModalList[this.modalIndex] || {};
      if (!popUpModal.type) {
        return false;
      }

      return (
        <div>
          {popUpModal.type === 1
            ? (
              <HashrateModal
                info={popUpModal}
                onViewed={this.modalViewed}
              />
            )
            : (
              <HashrateCouponModal
                info={popUpModal}
                onViewed={this.modalViewed}
              />
            )
          }
        </div>
      );
    },

    modalViewed() {
      if (this.hashModalList.length && this.modalIndex < (this.hashModalList.length - 1)) {
        this.modalIndex++;
      } else {
        this.showHashrateModal = false;
        window.$nuxt.refresh();
        this.modalIndex = 0;
      }
    },
  },

  render() {
    const link = `${process.env.MOBILE_SITE_HOST}/register/${this.userId}?locale=${getLocalLanguage()}`;
    return (
      <div class={styles['novice-bg']}>
        <div class={styles['novice-benefits']}>
          <BaseContainer>
            <img
              class={styles['novice-benefits-title-img']}
              src={getIsChinese() ? noviceBenefits : noviceBenefitsEn}
              alt=""
            />
            <div class={styles['novice-benefits-main-content']}>
              {this.getBenefitsList().map((item, index) => (
                <div class={styles['novice-benefits-content-item']}>
                  <div class={styles['benefits-detail-head']}>
                    <div class={styles['benefits-detail-tag']}>{item.tag}</div>
                    <div class={styles['head-top']}>
                      <div>
                        <div class={styles['benefits-detail-title']}>
                          {item.title}
                        </div>
                        <div class={styles['benefits-detail-subTitle']}>{item.subTitle}</div>
                      </div>
                      <div class={styles['head-button-box']}>
                        <div
                          class={classNames(
                            styles['benefits-detail-button'],
                            styles[this.getTaskCompletionMap(index, item.status).color],
                          )}
                          onClick={this.getTaskCompletionMap(index, item.status).on}
                        >
                          <Spin spinning={item.status === COMPLETED && item.loading}>
                            {this.getTaskCompletionMap(index, item.status).text}
                          </Spin>
                        </div>
                        <div class={styles['benefits-detail-worth']}>
                          {this.$t('worth')}
                        </div>
                      </div>
                    </div>
                    {item.conditions}
                  </div>
                  <div class={styles['benefits-detail-body']}>
                    <div class={styles['benefits-line']} />
                    <div class={styles['content-detail']}>
                      <div class={styles['content-describe']}>{item.describe}</div>
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BaseContainer>

          {this.showHashrateModal && this.getModalListNode()}

          <ShareQrCodeModal
            value={this.showShareQrCodeModal}
            onClose={() => { this.showShareQrCodeModal = false; }}
            title={this.$t('myInvitationQRCode')}
            content={link}
          />
        </div>
      </div>
    );
  },
};

export default NoviceBenefits;
