import Cookies from 'universal-cookie';
import locationServices from '@/shared/services/location/locationServices';
import { bindInvitationCodePath, homePath } from '@/router/consts/urls';
import { getQueryObject, getPathAndQueryObject } from '@/shared/utils/qsHelp';
import localStorage from '@/shared/utils/localStorage';

export default userInfo => {
  localStorage.setObject('userInfo', userInfo);
  localStorage.set('token', userInfo.token);
  const cookies = new Cookies();

  cookies.set('token', userInfo.token, { path: '/' });
  cookies.set('userId', userInfo.userId, { path: '/' });

  const { redirectUrl } = getQueryObject();

  if (userInfo.registerStatus) {
    locationServices.push(bindInvitationCodePath, { query: { isNewUser: true, redirectUrl } });
    return;
  }

  if (redirectUrl) {
    const { path, query } = getPathAndQueryObject(redirectUrl);
    locationServices.push(path, { query });
  } else {
    locationServices.push(homePath);
  }
};
