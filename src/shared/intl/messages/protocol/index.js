import investProtocol from './investProtocol';
import privacyProtocol from './privacyProtocol';
import serviceProtocol from './serviceProtocol';

export default {
  ...serviceProtocol,
  ...privacyProtocol,
  ...investProtocol,
};
