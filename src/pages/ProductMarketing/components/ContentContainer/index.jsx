import './index.less';

const ContentContainer = {
  props: {
    className: String,
  },

  render() {
    return (
      <div class={['content-container', this.className]}>
        {this.$slots.default}
      </div>
    );
  },
};

export default ContentContainer;
