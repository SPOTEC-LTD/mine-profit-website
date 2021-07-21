import './index.less';

const Title = {
  props: ['title'],
  render() {
    return (
      <div class="home-title-container">
        <span>{this.title}</span>
      </div>
    );
  },
};

export default Title;
