import { Breadcrumb } from 'ant-design-vue';
import find from 'lodash/find';
import Link from '@/shared/components/Link';

import './index.less';

const BaseContainer = {
  props: ['contentClassName'],
  computed: {
    breadcrumbData() {
      const { path } = this.$route.meta;
      const { routes } = this.$router.options;
      const resultData = [];
      path.split('/').forEach(name => {
        if (name) {
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
      <div class="container">
        <div class={['content', this.contentClassName]}>
          {
            showBreadcrumb && (
              <Breadcrumb
                class="page-breadcrumb"
                scopedSlots={{
                  separator: () => '>',
                }}
              >
                {
                  this.breadcrumbData.map(({ title, path }) => {
                    return (
                      <Breadcrumb.Item>
                        <Link to={path}>{title}</Link>
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
