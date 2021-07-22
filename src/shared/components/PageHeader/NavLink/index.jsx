import Link from '@/shared/components/Link';
import activeImg from '@/assets/active.png';

const NavLink = {
  props: ['href'],

  render() {
    return (
      <Link to={this.href}>
        <div class="nav-link">
          <div class="nav-link-content">
            {this.$slots.default}
          </div>
          <img
            class="nav-link-active-mark mark-hidden"
            src={activeImg}
            alt=""
          />
        </div>
    </Link>
    );
  },
};

export default NavLink;
