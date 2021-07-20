import isObject from 'lodash/isObject';
import locationServices from '@/shared/services/location/locationServices';

const NavLink = {
  props: ['to', 'className'],
  inheritAttrs: false,
  computed: {
    finlayTo() {
      if (!this.to) {
        return false;
      }

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
      <NuxtLink {...props} to={this.finlayTo} class={this.className}>
        {this.$slots.default}
      </NuxtLink>
    );
  },
};

export default NavLink;
