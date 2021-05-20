import './index.less';

const BlockTitle = {
  props: ['img', 'title'],
  render() {
    return (
      <div class="block-title-container">
        <img src={this.img} alt=""/>
        <span>{this.title}</span>
      </div>
    );
  },
};

export default BlockTitle;
