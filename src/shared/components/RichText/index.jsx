import './index.less';

const RichText = {
  props: {
    content: {
      type: String,
      default: '',
    },
  },

  render() {
    return (
      <div domPropsInnerHTML={this.content} class='rich-text-wrapper' />
    );
  },
};

export default RichText;
