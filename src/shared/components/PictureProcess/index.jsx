import './index.less';

const PictureProcess = {
  props: {
    image: String,
    className: [String, Array],
  },
  render() {
    return (
      <div
        style={{ backgroundImage: `url(${this.image})` }}
        class={['picture-process-wrap', this.className]}
        {...{
          on: this.$listeners,
          props: this.$attrs,
        }}
      />
    );
  },
};

export default PictureProcess;
