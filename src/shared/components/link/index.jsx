import isObject from 'lodash/isObject';
import locationServices from '@/shared/services/location/locationServices';

const Link = {
  props: ['to', 'isReload'],
  computed: {
    finlayTo() {
      if (isObject(this.to)) {
        const { path, query = {}, params = {} } = this.to;
        return locationServices.buildURL(path, { query, params });
      }

      return locationServices.buildURL(this.to);
    },
  },

  render() {
    const props = {
      attrs: this.$attrs,
    };

    return this.isReload ? (
      <a {...props} href={this.finlayTo}>
        {this.$slots.default}
      </a>
    )
      : (
      <router-link {...props} to={this.finlayTo}>
        {this.$slots.default}
      </router-link>
      );
  },
};

export default Link;
