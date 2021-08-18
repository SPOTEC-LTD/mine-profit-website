import { Upload, Spin } from 'ant-design-vue';
import { uploadFileUrl } from '@/api/file';
import Notification from '@/shared/services/Notification';

import styles from './index.less?module';

const PhotoUpload = {
  props: {
    value: String,
    uploadText: String,
    coverImage: String,
  },
  data() {
    return {
      loading: false,
      fileUrl: this.value,
    };
  },
  methods: {
    beforeUpload(file) {
      if (file.type !== 'image/png' && file.type !== 'image/png' && file.type !== 'image/jpeg') {
        Notification.error(this.$t('fileFormatError'));
        this.$emit('change', '');
        return false;
      }
      return true;
    },
    onChange({ file }) {
      if (file.status === 'uploading') {
        this.loading = true;
      }
      if (file.status === 'done') {
        this.fileUrl = file.response.body.url;
        this.$emit('change', this.fileUrl);
        this.loading = false;
      }
    },
  },
  render() {
    return (
      <Upload
        accept="image/*"
        action={uploadFileUrl}
        showUploadList={false}
        supportServerRender
        onChange={this.onChange}
        beforeUpload={this.beforeUpload}
      >
        <div class={styles['upload-enter']}>
          <Spin spinning={this.loading}>
            {this.value ? (
              <div class={styles['upload-img-box']}>
                <img src={this.fileUrl} alt="" />
              </div>
            ) : (
              <div class={styles['no-upload']}>
                <img src={this.coverImage} alt="" />
              </div>
            )}
            <div class={styles['upload-prompt']}>{this.uploadText}</div>
          </Spin>
        </div>
      </Upload>
    );
  },
};

export default PhotoUpload;
