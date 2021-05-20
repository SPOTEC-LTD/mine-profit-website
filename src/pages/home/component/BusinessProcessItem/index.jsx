import './index.less';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

const BusinessProcessItem = {
  props: ['businessProcess', 'activeIndex'],
  methods: {
    handleHover(index) {
      this.$emit('changeActivesIndex', index);
    },
  },
  created() {
    this.throttleHandleHover = throttle(this.handleHover, 500);
  },

  render() {
    return (
      <div class='text-introduce-container'>
        {
          this.businessProcess.map((item, index) => (
            <div
              class={classNames('text-introduce', { 'active-text-introduce': this.activeIndex === index })}
              onmouseenter={() => this.throttleHandleHover(index)}
            >
                <div class='process-icon'>{item.icon}</div>
                <div class="text-wrapper">
                  <span class="introduce-title">{item.title}</span>
                  <span>{item.content}</span>
                </div>
            </div>
          ))
        }
      </div>
    );
  },
};

export default BusinessProcessItem;
