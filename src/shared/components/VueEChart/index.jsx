import classNames from 'classnames';
import * as echarts from './echarts.min';

const VueEChart = {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    notMerge: {
      type: Boolean,
      default: false,
    },
    onEvents: {
      type: Object,
      default: () => {},
    },
    opts: {
      type: Object,
      default: () => {},
    },
    className: String,
    silent: Boolean,
    lazyUpdate: Boolean,

  },

  mounted() {
    this.initEcharts();
    this.renderEchartDom();
    this.bindEvents();
  },

  methods: {
    initEcharts() {
      this.chartRef = echarts.init(this.$refs.chartDom, this.theme, this.opts);
    },

    renderEchartDom() {
      this.chartRef.setOption(this.option, this.notMerge, this.lazyUpdate, this.silent);
    },

    bindEvents() {
      const bindEventFunc = (eventName, func) => {
        if (typeof eventName === 'string' && typeof func === 'function') {
          this.chartRef.on(eventName, param => {
            func(param, this.chartRef);
          });
        }
      };

      for (const eventName in this.onEvents) {
        if (Object.prototype.hasOwnProperty.call(this.onEvents, eventName)) {
          bindEventFunc(eventName, this.onEvents[eventName]);
        }
      }
    },

    dispose() {
      this.chartRef.dispose(this.$refs.chartDom);
    },

  },

  render() {
    const finallyStyle = {
      width: '100%',
      height: '100%',
    };

    return (
      <div
        ref="chartDom"
        style={finallyStyle}
        class={classNames('react-echart', this.className)}
      />
    );
  },
};

export default VueEChart;
