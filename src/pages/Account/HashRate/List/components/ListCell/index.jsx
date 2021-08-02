import classNames from 'classnames';
import CellTitle from '@/pages/Account/HashRate/List/components/CellTitle';

import './index.less';

const ListCell = {
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    className: {
      type: String,
    },
  },

  render() {
    return (
      <div>
        {
          this.dataSource.map(item => (
            <div class={classNames('p-cell-item', this.className)}>
              <div class="p-cell-item-label">
                <CellTitle
                  title={item.label}
                  showMention={item.showMention}
                  notificationContent={item.notificationContent}
                />
              </div>
              <div class="p-cell-item-value">{item.value}</div>
            </div>
          ))
        }
      </div>
    );
  },
};

export default ListCell;
