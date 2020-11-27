import qs from 'qs';
import { toPath } from '@/shared/utils/qsHelp';
import { locale } from '@/shared/intl';

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */

class Location {
  initialize(router) {
    this.router = router;
  }

  buildURL = (url, options = {}) => {
    const { params = {}, query = {} } = options;
    let serializedUrl = toPath(url, params);
    query.locale = locale.currentLocale;

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
    const { params, search } = options;
    const serializedUrl = this.buildURL(url, { params, search });

    this.router.replace(serializedUrl);

    return serializedUrl;
  }

  push(url, options = {}) {
    const { params, search } = options;
    const serializedUrl = this.buildURL(url, { params, search });

    this.router.push(serializedUrl);

    return serializedUrl;
  }
}

export default new Location();
