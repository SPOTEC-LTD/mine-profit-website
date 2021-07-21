import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import BtcFilled from 'ahoney/lib/icons/BtcFilled';
import EthFilled from 'ahoney/lib/icons/EthFilled';
import './index.less';

const ProductTitle = {
  props: {
    name: {
      type: String,
    },
    className: {
      type: String,
      default: '',
    },
    chainType: {
      type: String,
      default: '',
    },
    leftExtra: {
      type: [String, Boolean, Object],
      default: '',
    },
    avatar: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    onClick() {
      this.$emit('handleClick');
    },
  },

  render() {
    const chainTypeMap = {
      BTC: <div class='chain-icon btc-icon'><BtcFilled /></div>,
      ETH: <div class='chain-icon eth-icon'><EthFilled /></div>,
    };

    const rightContent = this.$scopedSlots.rightContent && this.$scopedSlots.rightContent();

    return (
      <div class={classNames('product-title', this.className)} onClick={this.onClick}>
        <div class='product-title-container'>
          {this.avatar || chainTypeMap[this.chainType]}
          <div class='product-content'>
            <div class="product-name-container">
              <div class='product-name-value'>
                {
                  !isUndefined(this.name)
                    ? <span class={['product-title-value', 'no-wrap']}>{this.name}</span>
                    : this.$scopedSlots.name()
                }
              </div>
              {rightContent}
            </div>
            {this.leftExtra && <div class={['product-name-extra', 'no-wrap']}>{this.leftExtra}</div>}
          </div>
        </div>
      </div>
    );
  },
};

export default ProductTitle;
