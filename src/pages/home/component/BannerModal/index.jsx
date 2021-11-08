import { mapActions } from 'vuex';
import locationHelp from '@/shared/utils/locationHelp';
import { bannerDetailPath } from '@/router/consts/urls';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { HOME, UPDATE_BANNER_SHOW_COUNT, UPDATE_BANNER_CLICK_COUNT } from '@/modules/home';
import HomeModal from '../HomeModal';
import { LINK, H5_CONTENT } from '../../consts/bannerTypes';
import styles from './index.less?module';

const BannerModal = {
  props: {
    info: Object,
  },
  methods: {
    ...mapActions(HOME, [UPDATE_BANNER_SHOW_COUNT, UPDATE_BANNER_CLICK_COUNT]),
    updateBannerViewCount(id) {
      this[UPDATE_BANNER_SHOW_COUNT]({ id });
    },
    toBannerDetailPage() {
      const { linkType, linkUrl, id } = this.info;
      const { userId = 'null' } = getUserInfoFunc();
      this.updateBannerViewCount(id);
      this[UPDATE_BANNER_CLICK_COUNT]({ id });
      if (linkType === LINK) {
        locationHelp.open(linkUrl);
      } else if (linkType === H5_CONTENT) {
        locationHelp.open(bannerDetailPath, { params: { userId, id } });
      }
      this.$emit('viewed', id);
    },
    close() {
      this.updateBannerViewCount(this.info.id);
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
      <HomeModal
        onClose={this.close}
        scopedSlots={{
          content: this.getBannerModalContent,
        }}
      />
    );
  },
};

export default BannerModal;
