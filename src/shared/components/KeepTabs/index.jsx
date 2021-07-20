import { Tabs } from 'ant-design-vue';
import isUndefined from 'lodash/isUndefined';

const KeepTabs = {
  props: {
    defaultName: { type: String },
    value: {
      type: String,
    },
  },

  data() {
    return {
      activeName: this.$route.query.activeName || this.defaultName,
    };
  },

  watch: {
    value(value) {
      this.asyncUrlQuery(value);
    },
  },

  methods: {
    asyncUrlQuery(newActiveKey) {
      if (this.$route.query.activeName !== newActiveKey) {
        this.$router.replace({ query: { ...this.$route.query, activeName: newActiveKey } });
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
    const resultValue = isUndefined(this.value) ? this.activeName : this.value;
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
