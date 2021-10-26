import { mapState, mapActions } from 'vuex';
import { Spin } from 'ant-design-vue';
import classNames from 'classnames';
import { ACTIVITY, GET_HASH_MODAL_LIST } from '@/modules/activity';
import { getIsChinese, getLocalLanguage } from '@/shared/utils/getLocalLanguage';
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
import {
  NOT_FINISHED, COMPLETED, RECEIVED, CONDITION_ONE, CONDITION_TWO, CONDITION_THREE,
} from './completionStatus';
import styles from './index.less?module';

const loop = () => { };
const NoviceBenefits = {
  async asyncData(ctx) {
    const props = { noviceBenefitsInfo: {} };
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
    };
  },
  computed: {
    ...mapState({
      hashModalList: state => state.activity.hashModalList,
      loading: state => state.loading.effects[`${ACTIVITY}/${GET_HASH_MODAL_LIST}`],
    }),
  },
  methods: {
    ...mapActions(ACTIVITY, [GET_HASH_MODAL_LIST]),
    getOneConditionNode(addCusServiceStatus) {
      return (
        <div class={styles['condition-box']}>
          <div class={styles.condition}>{`${this.$t('completeRegistration')}${addCusServiceStatus}`}</div>
        </div>
      );
    },

    getTwoConditionNode({ inviteCount, kycCount }) {
      return (
        <div class={styles['condition-box']}>
          <div class={styles.condition}>{`${this.$t('drawerInviteFriend')}${inviteCount}`}</div>
          <div class={styles.condition}>{`${this.$t('inviteFriendsRealName')}${kycCount}`}</div>
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
          describe: this.$t('welfareDesc1'),
          image: benefitsImg1,
          status: registrationStatus,
        },
        {
          title: this.$t('drawerInviteFriend'),
          tag: `${this.$t('welfare')}2`,
          subTitle: this.$t('experienceIsForce'),
          conditions: this.getTwoConditionNode({ inviteCount, kycCount }),
          describe: this.$t('welfareDesc2'),
          image: benefitsImg2,
          status: inviteStatus,
        },
        {
          title: this.$t('addOfficialService'),
          tag: `${this.$t('welfare')}3`,
          subTitle: this.$t('experienceIsForce'),
          conditions: this.getThreeConditionNode(weChat),
          describe: this.$t('welfareDesc3'),
          image: benefitsImg3,
          status: addCusServiceStatus,
        },
      ];

      return benefitsList;
    },

    getTaskCompletionMap(index, status) {
      const resultStatus = status || NOT_FINISHED;
      const benefitsMap = {
        [CONDITION_ONE]: { text: this.$t('sign'), on: this.toSignPage, color: 'brown-button' },
        [CONDITION_TWO]: { text: this.$t('invite'), on: this.toInviteFriendPage, color: 'brown-button' },
        [CONDITION_THREE]: { text: this.$t('uncompleted'), on: loop, color: 'gray-button' },
      };
      const statusMap = {
        [NOT_FINISHED]: benefitsMap[index],
        [COMPLETED]: { text: this.$t('draw'), on: () => this.openHashRateModal(index), color: 'brown-button' },
        [RECEIVED]: { text: this.$t('alreadyReceived'), on: loop, color: 'gray-button' },
      };

      return statusMap[resultStatus];
    },

    openHashRateModal(index) {
      const benefitsTypeList = [
        'REGISTRATION_SUCCESS', 'INVITE_FRIENDS', 'ADD_CUSTOMER_SERVICE_STAFF',
      ];
      this[GET_HASH_MODAL_LIST]({ benefitsType: benefitsTypeList[index] })
        .then(() => {
          this.showHashrateModal = true;
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
                          <span>{this.$t('worth')}</span>
                        </div>
                        <div class={styles['benefits-detail-subTitle']}>{item.subTitle}</div>
                      </div>
                      <div
                        class={classNames(
                          styles['benefits-detail-button'],
                          styles[this.getTaskCompletionMap(index, item.status).color],
                        )}
                        onClick={this.getTaskCompletionMap(index, item.status).on}
                      >
                        <Spin spinning={item.status === COMPLETED && !!this.loading}>
                          {this.getTaskCompletionMap(index, item.status).text}
                        </Spin>
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
