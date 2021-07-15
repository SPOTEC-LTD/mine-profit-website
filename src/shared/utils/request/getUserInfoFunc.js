import Cookies from 'universal-cookie';
import isServerSide from '@/shared/utils/isServerSide';
import localStorage from '@/shared/utils/localStorage';

function getUserInfoFunc(ctx, options) {
  const isServer = isServerSide();
  if (isServer) {
    const header = ctx.req && ctx.req.headers && ctx.req.headers.cookie;
    const uc = new Cookies(header);
    return uc.getAll(options);
  }

  return localStorage.getObject('userInfo');
}

export default getUserInfoFunc;
