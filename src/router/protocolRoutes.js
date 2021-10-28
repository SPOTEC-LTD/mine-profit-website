import InvestProtocol from '@/pages/Protocol/InvestProtocol';
import PrivacyProtocol from '@/pages/Protocol/PrivacyProtocol';
import ServiceProtocol from '@/pages/Protocol/ServiceProtocol';
import * as urls from './consts/urls';

export default [
  {
    path: urls.investProtocolPath,
    name: 'investProtocol',
    component: InvestProtocol,
  },
  {
    path: urls.privacyProtocolPath,
    name: 'privacyProtocolName',
    component: PrivacyProtocol,
  },
  {
    path: urls.serviceProtocolPath,
    name: 'serviceProtocol',
    component: ServiceProtocol,
  },
];
