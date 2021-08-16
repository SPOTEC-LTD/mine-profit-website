import Article from '@/shared/components/Article';
import { fetchQuestionDetail } from '@/api';

const QuestionDetail = {
  async asyncData(ctx) {
    const { params, redirect } = ctx;
    try {
      const { body: { mineQuestion } } = await fetchQuestionDetail({ pathParams: { id: params.id } }, { ctx });
      return { detail: mineQuestion };
    } catch (error) {
      redirect('/500');

      return { detail: {} };
    }
  },
  render() {
    const { publishTime, question, answer } = this.detail;
    return <Article publishTime={publishTime} title={question} content={answer} />;
  },
};

export default QuestionDetail;
