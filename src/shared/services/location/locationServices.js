import qs from 'qs';
import startsWith from 'lodash/startsWith';
import { toPath } from '@/shared/utils/qsHelp';
import locale from '@/shared/intl/utils/locale';
import { I18N } from '@@/i18n';

/**
 * These actions correspond to the history API.
 * The associated routerMidwdleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */

class Location {
  initialize(router) {
    this.router = router;
  }

  buildURL = (url, options = {}) => {
    const { params = {}, query = {} } = options;
    let serializedUrl = toPath(url, params);

    if (locale.currentLocale !== I18N.defaultLocale && !startsWith(serializedUrl, `/${locale.currentLocale}`)) {
      serializedUrl = `/${locale.currentLocale}${serializedUrl}`;
    }

    const queryStr = qs.stringify(query, { indices: false });

    queryStr && (serializedUrl = `${serializedUrl}?${queryStr}`);

    return serializedUrl;
  }

  goForward() {
    this.router.goForward();
  }

  goBack(stepNumber) {
    this.router.goBack(stepNumber);
  }

  go(stepNumber) {
    this.router.go(stepNumber);
  }

  replace(url, options = {}) {
    const { params, query } = options;
    const serializedUrl = this.buildURL(url, { params, query });

    this.router.replace(serializedUrl);

    return serializedUrl;
  }

  push(url, options = {}) {
    const { params, query } = options;
    const serializedUrl = this.buildURL(url, { params, query });

    this.router.push(serializedUrl);

    return serializedUrl;
  }
}

export default new Location();
