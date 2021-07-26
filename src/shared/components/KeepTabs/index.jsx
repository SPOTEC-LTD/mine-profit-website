import { Tabs } from 'ant-design-vue';
import omit from 'lodash/omit';
import isUndefined from 'lodash/isUndefined';

const KeepTabs = {
  inheritAttrs: false,
  props: {
    activeKeyName: { type: String, default: 'activeName' },
    defaultName: { type: String },
    value: { type: String },
  },

  data() {
    return {
      [this.activeKeyName]: this.$route.query[this.activeKeyName] || this.defaultName,
    };
  },

  watch: {
    value(value) {
      this.asyncUrlQuery(value);
    },
  },

  destroyed() {
    const finalQuery = omit(this.$route.query, [this.activeKeyName]);
    this.$router.replace({ query: finalQuery });
  },

  methods: {
    asyncUrlQuery(newActiveKey) {
      if (this.$route.query[this.activeKeyName] !== newActiveKey) {
        this.$router.replace({ query: { ...this.$route.query, [this.activeKeyName]: newActiveKey } });
      }
    },

    onChange(newActiveKey) {
      if (!this.value) {
        this.activeName = newActiveKey;
        this.asyncUrlQuery(newActiveKey);
      }

      this.$emit('change', newActiveKey);
    },
  },

  render() {
    const resultValue = isUndefined(this.value) ? this.activeKeyName : this.value;
    return (
      <Tabs
        animated={false}
        tabBarGutter={0}
        {...{
          on: this.$listeners,
          props: this.$attrs,
        }}
        activeKey={resultValue}
        onChange={this.onChange}
        >
        {this.$slots.default}
      </Tabs>
    );
  },
};

export default KeepTabs;

KeepTabs.TabPane = Tabs.TabPane;
