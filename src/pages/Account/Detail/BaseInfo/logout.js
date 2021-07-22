import Cookie from 'universal-cookie';
import locationServices from '@/shared/services/location/locationServices';
import localStorage from '@/shared/utils/localStorage';
import { homePath } from '@/router/consts/urls';

const logout = () => {
  new Cookie().remove('userId', { path: '/' });
  new Cookie().remove('token', { path: '/' });
  localStorage.setObject('userInfo', {});
  localStorage.set('token', '');

  locationServices.push(homePath);
};

export default logout;
