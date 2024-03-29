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
        body: { banner },
      } = await getBannerDetail({ pathParams: { id } }, { ctx });
      props.detail = banner;
    } catch (error) {
      redirect('/500');
    }

    return props;
  },
  render() {
    const { userId } = this.$route.params;
    const { publishTime, title, linkH5, count } = this.detail;
    return (
      <Article
        userId={userId}
        count={count}
        publishTime={publishTime}
        showDownloadInfo
        title={title}
        content={linkH5}
      />
    );
  },
};

export default BannerDetail;
