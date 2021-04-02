import { Random } from 'mockjs';

const homeAPIs = {
  depositList: (req, res) => res.json({
    header: {
      responseCode: '0000',
      responseMessage: 'get success',
      pageInfo: {
        orderBy: '',
        pageNumber: 0,
        totalPage: 0,
      },
    },
    body: {
      demandDepositList: new Array(5).fill('_').map(() => {
        const completed = Random.boolean();
        const completeStatus = Random.boolean();
        return {
          id: Random.string('number', 5),
          riskMargin: Random.integer(1000, 50000),
          financingAmount: Random.integer(1000, 20000),
          period: Random.integer(30, 1825),
          profitLoss: Random.integer(5000, 50000),
          completed,
          completeStatus: completed ? completeStatus : '',
          availableFinancingAmount: Random.integer(1000, 20000),
        };
      }),
    },
  }),
};

export default homeAPIs;
