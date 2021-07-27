import defaultAvatar from '@/assets/account/defaultAvatar.png';
import './index.less';

const PersonAvatar = {
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
  },

  render() {
    const { cname, avatar } = this.productData;
    return (
      <div class='avatar'>
        <img src={avatar || defaultAvatar} alt="" class='avatar-img' />
        <span class='user-name'>{cname}</span>
      </div>
    );
  },
};

export default PersonAvatar;
