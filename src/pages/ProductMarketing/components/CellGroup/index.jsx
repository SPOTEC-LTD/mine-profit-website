import { Row, Col } from 'ant-design-vue';
import SingleCell from '../SingleCell';
import './index.less';

const CellGroup = {
  props: {
    cellData: { type: Array },
    className: { type: String },
  },

  render() {
    return (
      <div class={['cell-group-wrapper', this.className]}>
        <Row gutter={20} type="flex">
          {this.cellData.map((item, index) => (
            <Col span={4.8}>
              <SingleCell
                class='cell-single-list'
                key={index}
                className={item.cellClass}
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
