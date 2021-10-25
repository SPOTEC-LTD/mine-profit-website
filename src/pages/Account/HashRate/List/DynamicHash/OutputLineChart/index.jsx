import VueEChart from '@/shared/components/VueEChart';
import DateUtils from '@/shared/intl/utils/dateUtils';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import styles from './index.less?module';

const MPTLineChart = {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    dateList() {
      return this.dataSource.map(item => DateUtils.formatDate(item.date, 'MM.DD'));
    },

    valueList() {
      return this.dataSource.map(item => item.outputAmount);
    },
  },

  render() {
    return (
      <div class={styles['chart-content']}>
        <VueEChart
          option={{
            title: {
              text: this.title,
              left: 'center',
              textStyle: {
                color: '#242424',
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 17,
              },
            },
            grid: {
              right: 0,
              bottom: 20,
              top: 35,
              left: 0,
            },
            textStyle: {
              color: '#242424',
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
                inside: true,
                align: 'left',
                verticalAlign: 'top',
                color: '#cacaca',
                lineHeight: 26,
                showMinLabel: false,
                formatter: value => bigNumberToFixed(value, 8),
              },
            },
            series: [{
              data: this.valueList,
              type: 'line',
              smooth: true,
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
              symbolSize: 0,
            }],
          }}
        />
      </div>
    );
  },
};

export default MPTLineChart;
