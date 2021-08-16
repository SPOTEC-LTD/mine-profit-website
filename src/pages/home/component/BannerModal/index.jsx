import BaseModal from '@/shared/components/BaseModal';
import locationHelp from '@/shared/utils/locationHelp';
import { bannerDetailPath } from '@/router/consts/urls';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { LINK, H5_CONTENT } from '../../consts/bannerTypes';
import styles from './index.less?module';

const BannerModal = {
  props: {
    info: Object,
  },
  methods: {
    toBannerDetailPage() {
      const { linkType, linkUrl, id } = this.info;
      const { userId = 'null' } = getUserInfoFunc();
      if (linkType === LINK) {
        locationHelp.open(linkUrl);
      } else if (linkType === H5_CONTENT) {
        locationHelp.open(bannerDetailPath, { params: { userId, id } });
      }
      this.$emit('viewed', id);
    },
    close() {
      this.$emit('viewed', this.info.id);
    },
    getBannerModalContent() {
      const { pushImage } = this.info;
      return (
        <div class={styles['banner-image-box']}>
          <img class={styles['push-image']} src={pushImage} alt="" onClick={this.toBannerDetailPage} />
        </div>
      );
    },
  },
  render() {
    return (
      <BaseModal
        value={true}
        width={389}
        wrapClassName={styles['banner-modal']}
        onClose={this.close}
        scopedSlots={{
          content: this.getBannerModalContent,
        }}
      ></BaseModal>
    );
  },
};

export default BannerModal;
