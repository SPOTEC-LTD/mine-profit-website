import { Button } from 'ant-design-vue';
import classNames from 'classnames';
import styles from './index.less?module';

const noop = () => { };

const FooterButtonGroup = {
  props: {
    dataSource: Array,
    className: String,
  },

  render() {
    return (
      <div class={classNames(styles.footer, this.className)}>
        {
          this.dataSource.map((item, index) => (
            <Button
              key={index}
              type={item.type || 'default'}
              onClick={item.onClick || noop}
              loading={item.loading}
            >
              <span>{item.label}</span>
            </Button>
          ))
        }
      </div>
    );
  },
};

export default FooterButtonGroup;
