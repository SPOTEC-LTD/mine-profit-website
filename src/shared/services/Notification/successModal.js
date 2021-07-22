import Notification from '@/shared/services/Notification';

export default ({ title }) => {
  Notification.success({
    message: h => {
      return h('SuccessNode', {
        props: {
          value: title,
        },
      });
    },
  });
};
