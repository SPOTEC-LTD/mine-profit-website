import find from 'lodash/find';
import { Breadcrumb } from 'ant-design-vue';
import { pathRoutes } from '@/router';
import Link from '@/shared/components/Link';
import matchPath from '@/shared/utils/matchPath';
import { urlToList } from '@/shared/utils/qsHelp';

import './index.less';

const BaseContainer = {
  props: {
    contentClassName: String,
    className: String,
    hasBreadcrumb: { type: Boolean, default: true },
  },
  computed: {
    breadcrumbData() {
      const { fullPath } = this.$route;
      const resultData = [];

      urlToList(fullPath).forEach(value => {
        const match = ({ path, name }) => {
          if (path !== '*') {
            const data = this.$i18n.locale === 'en' ? value.replace('/en', '') : value;
            const [pageName] = name.split('__');
            const matchedPath = matchPath(data, { path, exact: true });
            if (matchedPath) {
              resultData.push({
                path: matchedPath.url,
                title: this.$t(pageName),
              });
            }
          }
        };
        find(pathRoutes, match);
      });
      return resultData;
    },
  },

  render() {
    const { showBreadcrumb } = this.$route.meta;
    return (
      <div class={['container', this.className]}>
        <div class={['content', this.contentClassName]}>
          {this.hasBreadcrumb && showBreadcrumb && (
            <Breadcrumb
              class="page-breadcrumb"
              scopedSlots={{ separator: () => '>' }}
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
          )}
        {this.$slots.default}
        </div>
      </div>
    );
  },
};

export default BaseContainer;
