import homeAPIs from './home';

const apiMap = {
  'Fetch Home deposit list': {
    api: '/api/home/depositList',
    method: 'get',
    response: homeAPIs.depositList,
  },
};

export default apiMap;
