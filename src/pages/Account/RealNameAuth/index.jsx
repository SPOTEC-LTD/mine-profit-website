import { Button, FormModel, Input, Row, Col, Select, DatePicker, Upload, Spin } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import produce from 'immer';
import split from 'lodash/split';
import isEmpty from 'lodash/isEmpty';
import BaseContainer from '@/shared/components/BaseContainer';
import appIcon from '@/assets/account/app-icon.png';
import * as API from '@/api/sign';
import { ACCOUNT, USER_REAL_NAME_AUTH } from '@/modules/account/account';
import * as accountAPI from '@/api/account/userInfo';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import PageButton from '@/shared/components/PageButton';
import locationServices from '@/shared/services/location/locationServices';
import QRcode from '@/shared/components/QRcode';
import { downloadPath, accountDetailPath } from '@/router/consts/urls';
import frontIdPhoto from '@/assets/account/front-id-photo.png';
import backIdPhoto from '@/assets/account/back-id-photo.png';
import videoAuthImage from '@/assets/account/video-auth-image.png';
import { uploadFileUrl } from '@/api/file';
import { MALE, FEMALE } from '@/shared/consts/getGenders';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { ID_CARD, DRIVING_LICENSE, PASSPORT } from '@/shared/consts/getIdTypes';
import Notification from '@/shared/services/Notification';
import styles from './index.less?module';

const { Item } = FormModel;
const defaultDateValue = moment().subtract(18, 'year');

const RealNameAuth = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);

    const {
      body: { code },
    } = await accountAPI.getVideoAuthCode({ pathParams: { userId } }, { ctx });
    const {
      body: { list },
    } = await API.getCountries({}, { ctx });

    return { countries: list, videoAuthCode: code };
  },
  data() {
    return {
      frontPhotoUrl: '',
      frontPhotoLoading: false,
      backPhotoUrl: '',
      backPhotoLoading: false,
      isShowBackUpload: true,
      videoUploadLoading: false,
      form: {
        nation: '',
        birthday: defaultDateValue,
        currentAddress: '',
        idNumber: '',
        idType: ID_CARD,
        name: '',
        videoUrl: '',
        sex: MALE,
      },
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
      if (isEmpty(this.imageUrlList) || (this.form.idType !== DRIVING_LICENSE && this.imageUrlList.length !== 2)) {
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
  },
  methods: {
    ...mapActions(ACCOUNT, [USER_REAL_NAME_AUTH]),
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
      if (value === DRIVING_LICENSE) {
        this.isShowBackUpload = false;
      } else {
        this.isShowBackUpload = true;
      }
      this.resetUploadData();
      this.form.idType = value;
    },
    handleSexChange(value) {
      this.form.sex = value;
    },
    disabledDate(current) {
      return current.isAfter(defaultDateValue);
    },
    frontPhotoChange({ file }) {
      if (file.status === 'uploading') {
        this.frontPhotoLoading = true;
      }
      if (file.status === 'done') {
        this.frontPhotoUrl = file.response.body.url;
        this.frontPhotoLoading = false;
      }
    },
    backPhotoChange({ file }) {
      if (file.status === 'uploading') {
        this.backPhotoLoading = true;
      }
      if (file.status === 'done') {
        this.backPhotoUrl = file.response.body.url;
        this.backPhotoLoading = false;
      }
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
    photoBeforeUpload(file) {
      if (file.type.indexOf('image/') === -1) {
        Notification.error(this.$t('fileFormatError'));
        return false;
      }
      return true;
    },
    videoBeforeUpload(file) {
      if (file.type.indexOf('video/') === -1) {
        Notification.error(this.$t('fileFormatError'));
        return false;
      }
      return true;
    },
    handleSubmit() {
      const params = produce(this.form, draft => {
        draft.imageUrlList = this.imageUrlList;
        draft.birthday = this.form.birthday.format('YYYY-MM-DD');
      });

      this[USER_REAL_NAME_AUTH](params)
        .then(() => {
          // TODO 需要加一个认证中的弹窗再进行跳转
          locationServices.push(accountDetailPath);
        })
        .catch(async () => {
          this.form.videoUrl = '';
          const { userId } = getUserInfoFunc();
          const {
            body: { code },
          } = await accountAPI.getVideoAuthCode({ pathParams: { userId } });
          this.videoAuthCode = code;
        });
    },
  },
  render() {
    const lang = this.$i18n.locale;
    const idTypeColumns = [
      { value: ID_CARD, text: this.$t('idCard') },
      { value: DRIVING_LICENSE, text: this.$t('driverLicense') },
      { value: PASSPORT, text: this.$t('passport') },
    ];

    const sexColumns = [
      { value: MALE, text: this.$t('boy') },
      { value: FEMALE, text: this.$t('girl') },
    ];

    const frontUploadText = this.frontPhotoUrl ? this.$t('reUpload') : this.$t('uploadIdPhotoFace');
    const backUploadText = this.backPhotoUrl ? this.$t('reUpload') : this.$t('uploadIdpPhotoBack');
    const codeItemList = split(this.videoAuthCode, '');
    // TODO 地址暂时固定，需要后端配合
    const mobileAuthAddress = 'http://192.168.0.126:9060';

    return (
      <div>
        <BaseContainer contentClassName={styles['content-wrap']}>
          <div class={styles.content}>
            <div class={styles['method-one']}>
              <div class={styles['method-one-left']}>
                <div class={styles['method-title']}>{this.$t('authMethodOneTitle')}</div>
                <div class={styles['method-desc']}>{this.$t('authMethodOneDesc')}</div>
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
                <div class={styles['qr-code-box']}>
                  <QRcode value={mobileAuthAddress} options={{ width: 136 }} />
                </div>
              </div>
              <div></div>
            </div>

            <div class={styles['method-three']}>
              <div>
                <div class={styles['method-title']}>{this.$t('authMethodThreeTitle')}</div>
                <div class={styles['method-desc']}>{this.$t('authMethodThreeDesc')}</div>
              </div>

              <FormModel ref="ruleForm" hideRequiredMark props={{ model: this.form }} class="form">
                <Row gutter={[32, 0]}>
                  <Col span={12}>
                    <Item label={this.$t('name')}>
                      <Input
                        v-model={this.form.name}
                        maxLength={20}
                        placeholder={this.$t('realNameAuthNameInput')}
                      />
                    </Item>
                  </Col>
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
                          <Select.Option search={item[lang]} key={item.nation} label={item[lang]}>
                            {item[lang]}
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
                      <Input
                        v-model={this.form.idNumber}
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
                  <Upload
                    accept="image/*"
                    action={uploadFileUrl}
                    showUploadList={false}
                    supportServerRender
                    onChange={this.frontPhotoChange}
                    beforeUpload={this.photoBeforeUpload}
                  >
                    <div class={styles['upload-enter']}>
                      <Spin spinning={this.frontPhotoLoading}>
                        {this.frontPhotoUrl ? (
                          <div class={styles['upload-img-box']}>
                            <img src={this.frontPhotoUrl} alt="" />
                          </div>
                        ) : (
                          <div class={styles['no-upload']}>
                            <img src={frontIdPhoto} alt="" />
                          </div>
                        )}
                        <div class={styles['upload-prompt']}>{frontUploadText}</div>
                      </Spin>
                    </div>
                  </Upload>
                  {this.isShowBackUpload && (
                    <Upload
                      accept="image/*"
                      action={uploadFileUrl}
                      showUploadList={false}
                      supportServerRender
                      onChange={this.backPhotoChange}
                      beforeUpload={this.photoBeforeUpload}
                    >
                      <div class={styles['upload-enter']}>
                        <Spin spinning={this.backPhotoLoading}>
                          {this.backPhotoUrl ? (
                            <div class={styles['upload-img-box']}>
                              <img src={this.backPhotoUrl} alt="" />
                            </div>
                          ) : (
                            <div class={styles['no-upload']}>
                              <img src={backIdPhoto} alt="" />
                            </div>
                          )}
                          <div class={styles['upload-prompt']}>{backUploadText}</div>
                        </Spin>
                      </div>
                    </Upload>
                  )}
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
      </div>
    );
  },
};

export default RealNameAuth;
