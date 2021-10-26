import Article from '@/shared/components/Article';
import { getActivityDetail } from '@/api/activity';

const H5ContentDetails = {
  async asyncData(ctx) {
    const { params, redirect } = ctx;
    const props = { detail: {} };

    try {
      const { id } = params;
      const { body: { activity } } = await getActivityDetail({ pathParams: { id } }, { ctx });
      props.detail = activity;
    } catch (error) {
      console.log(error);
      redirect('/500');
    }

    return props;
  },
  render() {
    const { userId } = this.$route.params;
    const { updateTime, title, linkH5 } = this.detail;

    return (
      <Article
        userId={userId}
        showDownloadInfo
        publishTime={updateTime}
        title={title}
        content={linkH5}
      />
    );
  },
};

export default H5ContentDetails;
