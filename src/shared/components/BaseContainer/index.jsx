import './index.less';

const BaseContainer = {
  props: ['contentClassName'],

  render() {
    return (
      <div class="container">
        <div class={['content', this.contentClassName]}>
         {this.$slots.default}
        </div>
      </div>
    );
  },
};

export default BaseContainer;
