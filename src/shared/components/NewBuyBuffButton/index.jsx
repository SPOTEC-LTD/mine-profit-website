import { Button } from 'ant-design-vue';
import classNames from 'classnames';
import './index.less';

const NewBuyBuffButton = {
  props: ['className'],

  render() {
    const finlayProps = {
      on: this.$listeners,
      props: this.$attrs,
    };

    return (
      <Button
        type="primary"
        size="small"
        class={classNames('new-buy-button', this.className)}
        {...finlayProps}
        >
          {this.$slots.default}
        </Button>
    );
  },
};

export default NewBuyBuffButton;
