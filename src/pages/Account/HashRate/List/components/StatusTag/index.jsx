import { Tag } from 'ant-design-vue';
import isObject from 'lodash/isObject';
import styles from './index.less?module';

const StatusTag = {
  props: ['label', 'tagText', 'color', 'className'],
  render() {
    return (
      <div>
        {
          isObject(this.tagText) ?
            this.tagText
            :
            <Tag color={this.color} class={styles.tag}>{this.tagText}</Tag>
        }
      </div>

    );
  },
};

export default StatusTag;
