import { Dropdown, Menu } from 'ant-design-vue';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import Link from '@/shared/components/Link';
import activeImg from '@/assets/active.png';
import './index.less';

export default {
  name: 'NavMenu',
  props: ['hrefPrefix', 'items', 'children'],
  render() {
    const isActive = this.$route.path.indexOf(this.hrefPrefix) >= 0;
    return (
      <Dropdown
        overlayClassName="nav-menu-overlay"
        placement="bottomCenter"
        getPopupContainer={triggerNode => triggerNode.parentNode}
        overlay={(
          <Menu>
            {
              this.items.map(item => (
                <Menu.Item key={item.name}>
                  <Link to={{ path: item.href, query: { type: item.type } }} isReload>
                    <div
                      class={`nav-menu-item ${this.$route.query.type === item.type ? 'nav-menu-item--active' : ''}`}
                    >
                      <div class="nav-menu-icon">
                        {item.icon}
                      </div>
                      <div class="nav-menu-content">
                        <div class="nav-menu-name">
                          {item.name}
                        </div>
                        <div class="nav-menu-desc">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Menu.Item>
              ))
            }
          </Menu>
        )}
      >
        <a
          class={`nav-menu-trigger ${isActive ? 'nav-menu-trigger--active' : ''}`}
          onClick={e => e.preventDefault()}
        >
          <div class="nav-menu-trigger-content">
            <span>
              {this.$slots.default}
            </span>
            {
              isActive && (
                <img
                  class="nav-link-active-mark"
                  src={activeImg}
                  alt=""
                />
              )
            }
          </div>
          <RightOutlined class="nav-menu-trigger-icon" />
        </a>
      </Dropdown>
    );
  },
};
