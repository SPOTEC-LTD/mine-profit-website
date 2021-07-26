import Notification from '@/shared/services/Notification';

export default ({ title }) => {
  Notification.error(title);
};
