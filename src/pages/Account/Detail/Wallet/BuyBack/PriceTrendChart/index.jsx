import VueEChart from '@/shared/components/VueEChart';
import dateUtils from '@/shared/intl/utils/dateUtils';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import styles from './index.less?module';

const PriceTrendChart = {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    chainName: {
      type: String,
      default: '',
    },
  },

  computed: {
    dateList() {
      return this.dataSource.map(item => dateUtils.formatDate(item.dateTime, 'MM.DD'));
    },

    valueList() {
      return this.dataSource.map(item => bigNumberToFixed(item.value, 10));
    },

    chartOptions() {
      return {
        title: {
          top: 10,
          text: this.$t('priceTrend', { value: this.chainName }),
          left: 'center',
          textStyle: {
            color: '#242424',
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 17,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            axis: 'x',
            lineStyle: {
              width: 9,
              type: 'solid',
              color: 'rgba(2, 166, 227, 0.1)',
            },
          },
          confine: true,
          className: styles['tooltip-dark'],
          formatter: '{c} USDT',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: [6, 13],
          textStyle: {
            color: '#fff',
            fontWeight: 500,
            fontSize: 13,
            lineHeight: 18,
          },
        },
        grid: {
          right: 0,
          bottom: 30,
          top: 50,
          left: 90,
        },
        textStyle: {
          color: '#242424',
          fontSize: 12,
          lineHeight: 17,
        },
        xAxis: {
          type: 'category',
          data: this.dateList,
          axisTick: {
            show: false,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#e6e6e6',
              width: 1,
            },
          },
        },
        yAxis: {
          name: 'USDT',
          type: 'value',
          scale: true,
          nameTextStyle: {
            align: 'right',
          },
          splitLine: {
            lineStyle: {
              color: '#e6e6e6',
            },
          },
          axisLabel: {
            formatter(value) {
              return bigNumberToFixed(value, 10);
            },
          },
        },
        series: [{
          data: this.valueList,
          type: 'line',
          lineStyle: {
            color: {
              type: 'linear',
              x: 1,
              x2: 0,
              colorStops: [{
                offset: 0, color: '#02a6e3',
              }, {
                offset: 1, color: '#00c9c4',
              }],
            },
            width: 2,
            cap: 'round',
          },
          symbolSize: 9,
          showSymbol: false,
          itemStyle: {
            color: '#02a6e3',
            borderColor: '#02a6e3',
            borderWidth: 3,
          },
        }],
      };
    },
  },

  render() {
    return (
      <div class={styles['chart-content']}>
        <VueEChart option={this.chartOptions} />
      </div>
    );
  },
};

export default PriceTrendChart;
