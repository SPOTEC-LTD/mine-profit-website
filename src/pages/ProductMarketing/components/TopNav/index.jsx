import classNames from 'classnames';
import NavLink from '@/shared/components/NavLink';
import getPurePath from '@/shared/utils/getPurePath';
import { officialMarketingPath, c2cMarketingPath } from '@/router/consts/urls';

import styles from './index.less?module';

const TopMenu = {
  render() {
    const menuList = [
      {
        path: officialMarketingPath,
        nameKey: 'marketOfficialMarket',
      },
      {
        path: c2cMarketingPath,
        nameKey: 'marketC2CMarket',
      },
    ];

    const resultPath = getPurePath({ path: this.$route.path, locale: this.$i18n.locale });

    return (
      <div class={styles['menu-container']}>
        <div class={styles['menu-content']}>
          {
            menuList.map(({ path, nameKey }) => (
              <NavLink
                to={path}
                className={classNames({ [styles['active-link']]: resultPath === path })}
              >
                {this.$t(nameKey)}
              </NavLink>
            ))
          }
        </div>
      </div>
    );
  },
};

export default TopMenu;
