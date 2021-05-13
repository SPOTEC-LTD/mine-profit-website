import { Dropdown, Menu } from 'ant-design-vue';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import locationHelp from '@/shared/utils/locationHelp';
import './nav-menu.less';

export default {
  name: 'LanguageMenu',
  props: ['items'],
  methods: {
    onclickLanguage(value) {
      locationHelp.redirect(this.switchLocalePath(value));
    },
  },
  render() {
    return (
      <Dropdown
        overlayClassName="nav-menu-overlay"
        placement="bottomCenter"
        getPopupContainer={triggerNode => triggerNode.parentNode}
        overlay={(
          <Menu>
            {
              this.items.map(item => (
                <Menu.Item key={item.code}>
                  <div onClick={() => this.onclickLanguage(item.code)}>
                    <div
                      class={`nav-menu-item ${this.$i18n.locale === item.code ? 'nav-menu-item--active' : ''}`}
                    >
                      <div class="nav-menu-content">
                        <div class="nav-menu-name">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Menu.Item>
              ))
            }
          </Menu>
        )}
      >
        <a
          class='nav-menu-trigger'
          onClick={e => e.preventDefault()}
        >
          <div class="nav-menu-trigger-content">
            <span>
              {this.$slots.default}
            </span>
          </div>
          <RightOutlined class="nav-menu-trigger-icon" />
        </a>
      </Dropdown>
    );
  },
};
