import { Notification } from 'ant-design-vue';

import ErrorNode from './ErrorNode';
import SuccessNode from './SuccessNode';

export default {
  error(config) {
    Notification.open({
      prefixCls: 'mp-notification',
      class: 'error-notification',
      duration: 1.3,
      ...config,
    });
  },
  success(value, config) {
    Notification.open({
      prefixCls: 'mp-notification',
      class: 'success-notification',
      duration: 1.3,
      message: h => {
        return h('SuccessNode', {
          props: {
            value,
          },
        });
      },
      ...config,
    });
  },
};

export {
  ErrorNode,
  SuccessNode,
};
