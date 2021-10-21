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
    showMinLabelY: {
      type: Boolean,
      default: true,
    },
    boundaryGap: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    titleAlign: {
      type: String,
      default: 'center',
    },
    nameY: {
      type: String,
      default: '',
    },
  },

  computed: {
    dateList() {
      return this.dataSource.map(item => DateUtils.formatDate(item.dateTime, 'MM.DD'));
    },

    valueList() {
      return this.dataSource.map(item => item.value);
    },
  },

  render() {
    return (
      <div class={styles['chart-content']}>
        <VueEChart
          option={{
            title: {
              top: 10,
              text: this.title,
              left: this.titleAlign,
              textStyle: {
                color: '#242424',
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 17,
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
              boundaryGap: this.boundaryGap,
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
              name: this.nameY,
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
                showMinLabel: this.showMinLabelY,
                formatter(value) {
                  return bigNumberToFixed(value, 10);
                },
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
