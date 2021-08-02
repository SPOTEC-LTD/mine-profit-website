import { Breadcrumb } from 'ant-design-vue';
import find from 'lodash/find';
import startsWith from 'lodash/startsWith';
import Link from '@/shared/components/Link';

import './index.less';

const BaseContainer = {
  props: {
    contentClassName: String,
    className: String,
    hasBreadcrumb: { type: Boolean, default: true },
  },
  computed: {
    breadcrumbData() {
      const { path } = this.$route.meta;
      const { routes } = this.$router.options;
      const resultData = [];
      path.split('/').forEach(name => {
        if (name && !startsWith(name, ':')) {
          resultData.push({
            title: this.$t(name),
            path: find(routes, { name: `${name}___${this.$i18n.locale}` }).path,
          });
        }
      });

      return resultData;
    },
  },

  render() {
    const { showBreadcrumb } = this.$route.meta;
    return (
      <div class={['container', this.className]}>
        <div class={['content', this.contentClassName]}>
          {
            this.hasBreadcrumb && showBreadcrumb && (
              <Breadcrumb
                class="page-breadcrumb"
                scopedSlots={{
                  separator: () => '>',
                }}
              >
                {
                  this.breadcrumbData.map(({ title, path }, index) => {
                    return (
                      <Breadcrumb.Item>
                        {
                          this.breadcrumbData.length !== (index + 1) ?
                          <Link to={path}>{title}</Link>
                            :
                          <span>{title}</span>
                        }
                      </Breadcrumb.Item>
                    );
                  })
                }
              </Breadcrumb>
            )
          }
        {this.$slots.default}
        </div>
      </div>
    );
  },
};

export default BaseContainer;
