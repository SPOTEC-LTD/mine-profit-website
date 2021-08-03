import { Row, Col } from 'ant-design-vue';
import SingleCell from '../SingleCell';
import './index.less';

const CellGroup = {
  props: {
    cellData: { type: Array },
    className: { type: String },
    isC2CMarket: {
      type: Boolean,
      default: false,
    },
  },

  render() {
    const colSpan = this.isC2CMarket ? 6 : 4.8;
    return (
      <div class={['cell-group-wrapper', this.className]}>
        <Row gutter={20} type="flex">
          {this.cellData.map((item, index) => (
            <Col span={colSpan}>
              <SingleCell
                class='cell-single-list'
                key={index}
                className={item.cellClass}
                isC2CMarket={this.isC2CMarket}
                scopedSlots={{
                  title: () => item.title,
                  icon: () => item.icon,
                  default: () => item.content,
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  },
};

export default CellGroup;
