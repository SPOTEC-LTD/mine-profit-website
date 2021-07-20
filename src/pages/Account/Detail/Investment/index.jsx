import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';

// import './index.less';

const Investment = {
  render() {
    return (
      <div>
        <WidgetTitle>投资</WidgetTitle>
        <Card>
          <div>投资列表</div>
        </Card>
      </div>
    );
  },
};

export default Investment;
