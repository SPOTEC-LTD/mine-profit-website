import { fetchAnnouncementDetail } from '@/api';
import Article from '@/shared/components/Article';

const AnnouncementDetail = {
  async asyncData(ctx) {
    const { params, redirect } = ctx;
    const props = {
      detail: {},
    };
    try {
      const { body: { mineAnnouncement } } = await fetchAnnouncementDetail(
        { pathParams: { id: params.id } },
        { ctx },
      );
      props.detail = mineAnnouncement;
    } catch (error) {
      redirect('/500');
    }

    return props;
  },
  render() {
    const { publishTime, title, content } = this.detail;
    return <Article publishTime={publishTime} title={title} content={content} />;
  },
};

export default AnnouncementDetail;
