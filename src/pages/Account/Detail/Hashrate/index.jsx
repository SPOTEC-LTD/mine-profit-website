import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';

// import './index.less';

const Hashrate = {
  render() {
    return (
      <div>
        <WidgetTitle
          scopedSlots={{
            rightContent: () => <span>我的订单</span>,
          }}
        >
          算力
        </WidgetTitle>
        <Card>
          <div>算力列表</div>
        </Card>
      </div>
    );
  },
};

export default Hashrate;
