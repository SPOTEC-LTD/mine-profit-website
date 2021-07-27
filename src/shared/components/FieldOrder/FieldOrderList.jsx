import { sortDirectionsMap } from '@/shared/consts/sortDirections';
import FieldOrder from './FieldOrder';
import './index.less';

export const sortDesc = {
  default: 0,
  ascend: 1,
  descend: 2,
};

const FieldOrderList = {
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    const { defaultOrder, defaultIndex } = this.getDefault(this.dataSource);
    return {
      activeField: {
        activeFieldIndex: defaultIndex,
        orderIndex: defaultOrder,
      },
    };
  },

  methods: {
    onSortChange(value) {
      this.activeField = value;
      this.$emit('change', { field: value.field, order: sortDirectionsMap[value.order] });
    },

    getDefault(dataArray = []) {
      let defaultOrder;
      let defaultIndex;
      dataArray.forEach((item, index) => {
        if (item.defaultOrder) {
          defaultOrder = sortDesc[item.defaultOrder];
          defaultIndex = index;
        }
      });
      return { defaultOrder, defaultIndex };
    },
  },

  render() {
    return (
      <div class="order-group">
        {this.dataSource.map((item, itemIndex) => {
          return (
            <FieldOrder
              onSortChange={data => this.onSortChange({ ...data, activeFieldIndex: itemIndex, field: item.field })}
              label={item.label}
              value={this.activeField.activeFieldIndex === itemIndex ? this.activeField.orderIndex : 0}
            />
          );
        })}
      </div>
    );
  },
};

export default FieldOrderList;
