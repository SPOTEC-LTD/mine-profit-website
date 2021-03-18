import isObject from 'lodash/isObject';
import locationServices from '@/shared/services/location/locationServices';

const ALink = {
  props: ['to'],
  computed: {
    finalyTo() {
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
    return (
      <router-link {...props} to={this.finalyTo}>
        {this.$slots.default}
      </router-link>
    );
  },
};

export default ALink;
