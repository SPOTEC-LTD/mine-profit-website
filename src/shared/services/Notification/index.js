import { Notification } from 'ant-design-vue';

import ErrorNode from './ErrorNode';

export default {
  error(config) {
    Notification.open({
      prefixCls: 'mp-notification',
      class: 'error-notification',
      duration: 1.3,
      ...config,
    });
  },
};

export {
  ErrorNode,
};
