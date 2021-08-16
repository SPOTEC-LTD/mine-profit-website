import Article from '@/shared/components/Article';
import { fetchGoodNewsDetail } from '@/api';

const RecommendDetail = {
  async asyncData(ctx) {
    const { params, redirect } = ctx;
    let textInfo = {};
    try {
      const { body } = await fetchGoodNewsDetail({
        pathParams: { id: params.id },
      }, { ctx });
      textInfo = body.textInfo;
    } catch (error) {
      redirect('/500');
    }

    return { detail: textInfo };
  },
  render() {
    const { publishTime, title, content } = this.detail;
    return <Article publishTime={publishTime} title={title} content={content} />;
  },
};

export default RecommendDetail;
