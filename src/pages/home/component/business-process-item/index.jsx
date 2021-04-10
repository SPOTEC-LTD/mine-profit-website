import './index.less';
import classNames from 'classnames';

const businessProcessItem = {
  props: ['businessProcess', 'activeIndex'],

  render() {
    return (
      <div class='text-introduce-container'>
        {
          this.businessProcess.map((item, index) => (
            <div
              class={classNames('text-introduce', { 'active-text-introduce': this.activeIndex === index })}
              onclick={() => this.$emit('changeActivesIndex', index)}
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

export default businessProcessItem;
