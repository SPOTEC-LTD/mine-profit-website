import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';

// import './index.less';

const Wallet = {
  render() {
    return (
      <div>
        <WidgetTitle>钱包</WidgetTitle>
        <Card>
          <div>钱包详情</div>
          <div>钱包记录</div>
        </Card>
      </div>
    );
  },
};

export default Wallet;
