import Article from '@/shared/components/Article';
import { getBannerDetail } from '@/api/home';

const BannerDetail = {
  async asyncData(ctx) {
    const { params, redirect } = ctx;
    const props = {
      detail: {},
    };
    try {
      const { id } = params;
      const {
        body: { bannerAdmin },
      } = await getBannerDetail({ pathParams: { id } }, { ctx });
      props.detail = bannerAdmin;
    } catch (error) {
      redirect('/500');
    }

    return props;
  },
  render() {
    const { userId } = this.$route.params;
    const { publishTime, title, linkH5 } = this.detail;
    return <Article userId={userId} publishTime={publishTime} showDownloadInfo title={title} content={linkH5} />;
  },
};

export default BannerDetail;
