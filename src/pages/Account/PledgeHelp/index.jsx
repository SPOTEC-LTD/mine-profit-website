import Article from '@/shared/components/Article';
import { getThemeDetail } from '@/api/account/hashRate';
import { PLEDGE_HELP_ID } from '../consts/pledgeHelpId';

const PledgeHelp = {
  async asyncData(ctx) {
    const { redirect } = ctx;
    const props = { data: {} };

    try {
      const { body: { mineThemeAnswer } } = await getThemeDetail({ pathParams: { id: PLEDGE_HELP_ID } }, { ctx });
      props.data = mineThemeAnswer;
    } catch (error) {
      console.log('--', error);
      redirect('/500');
    }

    return props;
  },

  render() {
    const { userId } = this.$route.params;
    const { title, publishTime, content } = this.data;

    return (
      <Article
        userId={userId}
        showDownloadInfo
        publishTime={publishTime}
        title={title}
        content={content}
      />
    );
  },
};

export default PledgeHelp;
