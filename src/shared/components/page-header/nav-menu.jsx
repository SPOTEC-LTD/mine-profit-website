import { Dropdown, Menu } from 'ant-design-vue';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';

import './nav-menu.less';

export default {
  name: 'NavMenu',
  props: ['hrefPrefix', 'items', 'children'],
  render() {
    const isActive = this.$route.path.indexOf(this.hrefPrefix) >= 0;
    return (
      <Dropdown
        overlayClassName="nav-menu-overlay"
        placement="bottomCenter"
        overlay={(
          <Menu>
            {
              this.items.map(item => (
                <Menu.Item key={item.name}>
                  <a href={item.href}>
                    <div
                      class={`nav-menu-item ${this.$route.path === item.href ? 'nav-menu-item--active' : ''}`}
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
                  </a>
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
          {this.$slots.default}
          <RightOutlined class="nav-menu-trigger-icon" />
        </a>
      </Dropdown>
    );
  },
};
