import { Button, FormModel, Input, Row, Col, Select, DatePicker, Upload, Spin } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import moment from 'moment';
import split from 'lodash/split';
import omit from 'lodash/omit';
import BaseContainer from '@/shared/components/BaseContainer';
import appIcon from '@/assets/account/app-icon.png';
import * as API from '@/api/sign';
import { ACCOUNT, USER_REAL_NAME_AUTH } from '@/modules/account/account';
import * as accountAPI from '@/api/account/userInfo';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import PageButton from '@/shared/components/PageButton';
import locationServices from '@/shared/services/location/locationServices';
import QRCodeModule from '@/shared/components/QRCodeModule';
import { downloadPath, accountDetailPath } from '@/router/consts/urls';
import frontIdPhoto from '@/assets/account/front-id-photo.png';
import backIdPhoto from '@/assets/account/back-id-photo.png';
import videoAuthImage from '@/assets/account/video-auth-image.png';
import { uploadFileUrl } from '@/api/file';
import { idNumberReg, textReg } from '@/shared/consts/rules';
import { MALE, FEMALE } from '@/shared/consts/getGenders';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { ID_CARD, DRIVING_LICENSE, PASSPORT } from '@/shared/consts/getIdTypes';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import locale from '@/shared/intl/utils/locale';
import Notification from '@/shared/services/Notification';
import FormatInput from '@/shared/components/FormatInput';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import { GLOBAL_BUSINESS_EXCEPTION } from '@/shared/utils/request/consts/ResponseCode';
import PhotoUpload from './components/PhotoUpload';
import styles from './index.less?module';

const { Item } = FormModel;
const defaultDateValue = moment().subtract(18, 'year');

const RealNameAuth = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);
    const props = {
      countries: [],
      videoAuthCode: '',
    };

    const fetchVideoAuthCode = await accountAPI.getVideoAuthCode({ pathParams: { userId } }, { ctx });
    const fetchCountries = await API.getCountries({}, { ctx });

    try {
      const { body: { code } } = fetchVideoAuthCode;
      props.videoAuthCode = code;
    } catch (error) {
      console.log(error, 'error');
    }

    try {
      const { body: { list } } = fetchCountries;
      props.countries = list;
    } catch (error) {
      console.log(error, 'error');
    }

    return props;
  },
  data() {
    return {
      frontPhotoUrl: '',
      frontPhotoLoading: false,
      isControlCheck: false,
      backPhotoUrl: '',
      backPhotoLoading: false,
      videoUploadLoading: false,
      form: {
        nation: '',
        birthday: defaultDateValue,
        currentAddress: '',
        idNumber: '',
        idType: ID_CARD,
        videoUrl: '',
        sex: MALE,
        lastName: '',
        firstName: '',
      },
      isChinese: getIsChinese(),
    };
  },
  computed: {
    ...mapState({
      submitLoading: state => state.loading.effects[`${ACCOUNT}/${USER_REAL_NAME_AUTH}`],
    }),
    disabled() {
      let result = false;
      for (const key in this.form) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          const element = this.form[key];
          if (element === '') {
            result = true;
          }
        }
      }
      const [firstUrl, secondUrl] = this.imageUrlList;
      if (!firstUrl || !secondUrl) {
        result = true;
      }
      return result;
    },
    imageUrlList() {
      const result = [];
      if (this.frontPhotoUrl) {
        result.push(this.frontPhotoUrl);
      }
      if (this.backPhotoUrl) {
        result.push(this.backPhotoUrl);
      }
      return result;
    },
    lang() {
      return this.isChinese ? 'zh' : 'en';
    },
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(ACCOUNT, [USER_REAL_NAME_AUTH]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    redirectToDownloadGuidePage() {
      locationServices.push(downloadPath);
    },
    handleCountriesChange(value) {
      this.form.nation = value;
    },
    resetUploadData() {
      this.frontPhotoUrl = '';
      this.backPhotoUrl = '';
    },
    handleIdTypeChange(value) {
      this.resetUploadData();
      this.form.idType = value;
    },
    handleSexChange(value) {
      this.form.sex = value;
    },
    disabledDate(current) {
      return current.isAfter(defaultDateValue);
    },
    videoChange({ file }) {
      if (file.status === 'uploading') {
        this.videoUploadLoading = true;
      }
      if (file.status === 'done') {
        this.form.videoUrl = file.response.body.url;
        this.videoUploadLoading = false;
      }
    },
    videoBeforeUpload(file) {
      if (file.type.indexOf('video/') === -1) {
        this.form.videoUrl = '';
        Notification.error(this.$t('fileFormatError'));
        return false;
      }
      return true;
    },
    handleSubmit() {
      let name = `${this.form.lastName}${this.form.firstName}`;
      if (!this.isChinese) {
        name = `${this.form.firstName} ${this.form.lastName}`;
      }
      const params = omit(this.form, ['firstName', 'lastName']);
      params.imageUrlList = this.imageUrlList;
      params.birthday = this.form.birthday.format('YYYY-MM-DD');
      params.name = name;

      this[USER_REAL_NAME_AUTH](params)
        .then(() => {
          this.isControlCheck = true;
        })
        .catch(async errorInfo => {
          const { code: errorCode } = errorInfo;
          if (errorCode === GLOBAL_BUSINESS_EXCEPTION) {
            this.form.videoUrl = '';
            const { userId } = getUserInfoFunc();
            try {
              const { body: { code } } = await accountAPI.getVideoAuthCode({ pathParams: { userId } });
              this.videoAuthCode = code;
            } catch (error) {
              console.log(error, 'error');
            }
          }
        });
    },
  },
  render() {
    const idTypeColumns = [
      { value: ID_CARD, text: this.$t('idCard') },
      { value: DRIVING_LICENSE, text: this.$t('driverLicense') },
      { value: PASSPORT, text: this.$t('passport') },
    ];

    let firstPromptText = this.$t('realNameAuthIDCardFront');
    let secondPromptText = this.$t('realNameAuthIDCardBack');

    if (this.form.idType === DRIVING_LICENSE) {
      firstPromptText = this.$t('realNameAuthDriverFront');
      secondPromptText = this.$t('realNameAuthDriverBack');
    }

    if (this.form.idType === PASSPORT) {
      firstPromptText = this.$t('realNameAuthPassportCover');
      secondPromptText = this.$t('realNameAuthPassportContent');
    }

    const sexColumns = [
      { value: MALE, text: this.$t('boy') },
      { value: FEMALE, text: this.$t('girl') },
    ];

    const frontUploadText = this.frontPhotoUrl ? this.$t('reUpload') : firstPromptText;
    const backUploadText = this.backPhotoUrl ? this.$t('reUpload') : secondPromptText;
    const codeItemList = split(this.videoAuthCode, '');
    const mobileAuthAddress = `${process.env.WEB_APP_SITE_HOST}/${locale.currentLocale}/account/realNameAuth`;
    return (
      <div>
        <BaseContainer contentClassName={styles['content-wrap']}>
          <div class={styles.content}>
            <div class={styles['method-one']}>
              <div class={styles['method-one-left']}>
                <div class={styles['method-title']}>{this.$t('authMethodOneTitle')}</div>
                <div class={styles['method-desc']}>
                  {this.$t('authMethodOneDesc', { enProductName: this.$t('enProductName') })}
                </div>
              </div>
              <div class={styles['method-one-right']}>
                <img class={styles['app-icon']} src={appIcon} alt="" />
                <Button class="download-button" type="primary" onClick={this.redirectToDownloadGuidePage}>
                  {this.$t('downloadNow')}
                </Button>
              </div>
            </div>

            <div class={styles['method-two']}>
              <div>
                <div class={styles['method-title']}>{this.$t('authMethodTwoTitle')}</div>
                <div class={styles['method-desc']}>{this.$t('authMethodTwoDesc')}</div>
                <QRCodeModule className={styles['qr-code']} value={mobileAuthAddress} options={{ width: 128 }} />
              </div>
              <div></div>
            </div>

            <div class={styles['method-three']}>
              <div>
                <div class={styles['method-title']}>{this.$t('authMethodThreeTitle')}</div>
                <div class={styles['method-desc']}>{this.$t('authMethodThreeDesc')}</div>
              </div>

              <FormModel ref="ruleForm" hideRequiredMark props={{ model: this.form }} class="normal-form">
                <Row gutter={[32, 0]}>
                  {this.isChinese && (
                    <Col span={6}>
                      <Item label={this.$t('familyName')}>
                        <FormatInput
                          value={this.form.lastName}
                          formatReg={textReg}
                          maxLength={50}
                          onChange={value => {
                            this.form.lastName = value;
                          }}
                        />
                      </Item>
                    </Col>
                  )}
                  <Col span={6}>
                    <Item label={this.$t('givenName')}>
                      <FormatInput
                        value={this.form.firstName}
                        formatReg={textReg}
                        maxLength={50}
                        onChange={value => {
                          this.form.firstName = value;
                        }}
                      />
                    </Item>
                  </Col>
                  {!this.isChinese && (
                    <Col span={6}>
                      <Item label={this.$t('familyName')}>
                      <FormatInput
                          value={this.form.lastName}
                          formatReg={textReg}
                          maxLength={50}
                          onChange={value => {
                            this.form.lastName = value;
                          }}
                        />
                      </Item>
                    </Col>
                  )}
                  <Col span={12}>
                    <Item label={this.$t('nationality')}>
                      <Select
                        onChange={this.handleCountriesChange}
                        showSearch
                        optionFilterProp="search"
                        optionLabelProp="label"
                        suffixIcon={<TriangleFilled className="select-icon" />}
                        placeholder={this.$t('pleaseSelectNationality')}
                        dropdownMatchSelectWidth={false}
                      >
                        {this.countries.map(item => (
                          <Select.Option search={item[this.lang]} key={item.nation} label={item[this.lang]}>
                            {item[this.lang]}
                          </Select.Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                </Row>
                <Row gutter={[32, 0]}>
                  <Col span={12}>
                    <Item label={this.$t('sex')}>
                      <Select
                        onChange={this.handleSexChange}
                        defaultValue={MALE}
                        optionLabelProp="label"
                        suffixIcon={<TriangleFilled className="select-icon" />}
                        dropdownMatchSelectWidth={false}
                      >
                        {sexColumns.map(({ value, text }) => (
                          <Select.Option key={value} label={text}>
                            {text}
                          </Select.Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item label={this.$t('realNameAuthDateOfBirth')}>
                      <DatePicker
                        v-model={this.form.birthday}
                        defaultValue={defaultDateValue}
                        disabledDate={this.disabledDate}
                        allowClear={false}
                        showToday={false}
                        inputReadOnly
                        dropdownClassName={styles['dropdown-box']}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row gutter={[32, 0]}>
                  <Col span={12}>
                    <Item label={this.$t('realNameAuthCertificateType')}>
                      <Select
                        onChange={this.handleIdTypeChange}
                        defaultValue={ID_CARD}
                        optionLabelProp="label"
                        suffixIcon={<TriangleFilled className="select-icon" />}
                        dropdownMatchSelectWidth={false}
                      >
                        {idTypeColumns.map(({ value, text }) => (
                          <Select.Option key={value} label={text}>
                            {text}
                          </Select.Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item label={this.$t('realNameAuthCertificateNum')}>
                      <FormatInput
                        value={this.form.idNumber}
                        formatReg={idNumberReg}
                        onChange={value => {
                          this.form.idNumber = value;
                        }}
                        maxLength={20}
                        placeholder={this.$t('realNameAuthCertificateNumInput')}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Item label={this.$t('realNameAuthAddress')}>
                      <Input
                        v-model={this.form.currentAddress}
                        maxLength={100}
                        placeholder={this.$t('realNameAuthAddressInput')}
                      />
                    </Item>
                  </Col>
                </Row>
                <Item label={this.$t('uploadCertificatePhoto')}>
                  <PhotoUpload
                    value={this.frontPhotoUrl}
                    coverImage={frontIdPhoto}
                    uploadText={frontUploadText}
                    onChange={url => { this.frontPhotoUrl = url; }}
                  />
                  <PhotoUpload
                    value={this.backPhotoUrl}
                    coverImage={backIdPhoto}
                    uploadText={backUploadText}
                    onChange={ url => { this.backPhotoUrl = url; }}
                  />
                </Item>
                <Item label={this.$t('authVideoTitle')}>
                  <div class={styles['video-upload-box']}>
                    <div class={styles['video-box-left']}>
                      <div>
                        <div>{this.$t('videoAuthRequestText')}</div>
                        <div class={styles['auth-code-box']}>
                          {codeItemList.map((item, index) => (
                            <div class={styles['auth-code-item']} key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <img src={videoAuthImage} alt="" />
                    </div>
                    <Upload
                      accept="video/*"
                      action={uploadFileUrl}
                      beforeUpload={this.videoBeforeUpload}
                      showUploadList={false}
                      onChange={this.videoChange}
                      supportServerRender
                    >
                      <Spin spinning={this.videoUploadLoading}>
                        <div class={styles['upload-video']}>
                          {this.form.videoUrl ? (
                            <div class={styles['video-content']}>
                              <video src={this.form.videoUrl} />
                              <div class={styles['reload-button-box']}>
                                <Button class="download-button" type="primary">
                                  {this.$t('reUpload')}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button class="download-button" type="primary">
                              {this.$t('uploadVideo')}
                            </Button>
                          )}
                        </div>
                      </Spin>
                    </Upload>
                  </div>
                  <div class={styles['video-length-prompt']}>{this.$t('videoLengthPrompt')}</div>
                </Item>
              </FormModel>
            </div>
          </div>
        </BaseContainer>
        <PageButton
          disabled={this.disabled}
          type="primary"
          loading={this.submitLoading}
          onClick={this.handleSubmit}
        >
          {this.$t('confirm')}
        </PageButton>

        <TradeBeforeVerified
          isVerifiedKyc
          isOnlyVerifiedKyc
          isControlCheck={this.isControlCheck}
          onVerifiedPass={() => { locationServices.push(accountDetailPath); }}
          onDialogClose={() => { locationServices.push(accountDetailPath); }}
        />
      </div>
    );
  },
};

export default RealNameAuth;
