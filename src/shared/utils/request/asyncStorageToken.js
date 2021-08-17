import Cookies from 'universal-cookie';
import localStorage from '@/shared/utils/localStorage';

function asyncStorageToken() {
  const uc = new Cookies();
  const cookieToken = uc.get('token');
  const { token } = localStorage.getObject('userInfo');
  if (!cookieToken === token) {
    localStorage.setObject('userInfo', {});
    localStorage.set('token', '');
    localStorage.set('isNotFirstShow', '');
  }
}

export default asyncStorageToken;
