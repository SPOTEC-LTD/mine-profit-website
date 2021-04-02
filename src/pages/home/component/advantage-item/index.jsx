import './index.less';

const advantageItem = {
  props: ['advantages'],
  render() {
    return (
      <div class='advantages-container'>
        {
          this.advantages.map(item => (
            <div class="advantages-items">
              <div class='advantages-icon'>{item.icon}</div>
              <span class='advantages-title'>{item.title}</span>
              <span class='advantages-content'>{item.content}</span>
            </div>
          ))
        }
      </div>
    );
  },
};

export default advantageItem;
