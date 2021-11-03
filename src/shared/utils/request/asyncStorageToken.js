import Cookies from 'universal-cookie';
import localStorage from '@/shared/utils/localStorage';

function asyncStorageToken() {
  const uc = new Cookies();
  const cookieToken = uc.get('token');
  if (!cookieToken) {
    localStorage.setObject('userInfo', {});
    localStorage.set('isNotFirstShow', '');
  }
}

export default asyncStorageToken;
