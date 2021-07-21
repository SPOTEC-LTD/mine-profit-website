import classNames from 'classnames';
import './index.less';

const Card = {
  props: {
    className: String,
  },

  render() {
    return (
      <div class={classNames('card', this.className)}>
        <div class='card-header'>
          {this.$scopedSlots.header()}
        </div>
        <div class='card-content'>
          {this.$scopedSlots.default()}
          {this.$scopedSlots.footer && this.$scopedSlots.footer()}
        </div>
      </div>
    );
  },

};

export default Card;
