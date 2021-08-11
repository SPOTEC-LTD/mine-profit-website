import { List } from 'ant-design-vue';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import isEmpty from 'lodash/isEmpty';

import dateUtils from '@/shared/intl/utils/dateUtils';
import NoData from '@/shared/components/NoData';

import styles from './index.less?module';

const ListWrap = {
  props: ['id', 'list', 'loading'],

  mounted() {
    document.getElementById(this.id).addEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.$emit('listScroll', document.getElementById(this.id));
    },

    getRedDotTitle({ title, showDot }) {
      return (
        <div class={styles['cell-self-title']}>
          {showDot && <div class={styles['red-dot']} />}
          <span>{title}</span>
        </div>
      );
    },
  },

  render() {
    return (
      <List id={this.id} loading={this.loading}>
        {!isEmpty(this.list)
          ? this.list.map(item => (
            <List.Item key={item.id}>
              <div
                class={styles['list-item']}
                onClick={() => { this.$emit('showMailDetail', item); }}
              >
                <div>
                  {this.getRedDotTitle({ title: item.messageTitle, showDot: !item.read })}
                  <div class={styles['item-time']}>
                    {dateUtils.formatDateTime(item.sendTime, 'YYYY.MM.DD HH:mm')}
                  </div>
                </div>
                <RightOutlined />
              </div>
            </List.Item>
          ))
          : <NoData class={styles['no-data']} hasText={false} />
        }
      </List>
    );
  },
};

export default ListWrap;
