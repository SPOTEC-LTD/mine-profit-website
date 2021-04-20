import SquareDots from '@/assets/square-dots.svg?inline';
import './index.less';

const SquareDotsIcon = {
  props: ['img', 'title'],
  render() {
    return (
      <div class="square-dots">
        <SquareDots class="square-dots-icon" />
      </div>
    );
  },
};

export default SquareDotsIcon;
