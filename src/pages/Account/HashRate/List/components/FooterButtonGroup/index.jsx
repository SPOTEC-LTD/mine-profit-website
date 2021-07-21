import { Button } from 'ant-design-vue';
import classNames from 'classnames';
import styles from './index.less?module';

const noop = () => {};

const FooterButtonGroup = {
  props: {
    dataSource: Array,
    className: String,
  },

  render() {
    return (
      <div class={classNames(styles['footer-button'], this.className)}>
        {
          this.dataSource.map(item => (
            <Button
              type="default"
              class={[{ [styles['button--disabled']]: item.disabled }]}
              onClick={item.onClick || noop}
              loading={item.loading}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))
        }
      </div>
    );
  },
};

export default FooterButtonGroup;
