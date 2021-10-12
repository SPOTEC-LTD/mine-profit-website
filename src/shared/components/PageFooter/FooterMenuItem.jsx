import Link from '@/shared/components/Link';
import './index.less';

const PageFooter = {
  props: {
    navTitle: String,
    itemData: Array,
  },

  data() {
    return {};
  },

  render() {
    return (
      <div>
        <div class="page-footer-nav-category">{this.navTitle}</div>
          {this.itemData.map(item => (
            <Link to={item.to} isReload={item.isReload} class="page-footer-nav-item">
              {item.text}
            </Link>
          ))}
      </div>
    );
  },
};

export default PageFooter;
