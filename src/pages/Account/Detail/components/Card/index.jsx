import './index.less';

const Card = {
  render() {
    return (
      <div class="account-card">
        {this.$slots.default}
      </div>
    );
  },
};

export default Card;
