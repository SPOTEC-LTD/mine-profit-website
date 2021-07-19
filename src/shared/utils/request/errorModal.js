import Notification from '@/shared/services/Notification';

export default ({ title }) => {
  Notification.error({
    message: h => {
      return h(
        'ErrorNode',
        {
          props: {
            value: title,
          },
        },
      );
    },
  });
};
