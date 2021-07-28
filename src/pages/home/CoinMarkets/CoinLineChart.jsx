import VueEChart from '@/shared/components/VueEChart';
import styles from './index.less?module';

const CoinLineChart = {
  props: ['data'],
  render() {
    return (
      <div class={styles.chart}>
        <div class={styles['chart-content']}>
          <VueEChart
            option = {{
              grid: {
                right: 0,
                bottom: 0,
                top: 0,
                left: 40,
              },
              xAxis: {
                show: false,
                type: 'category',
              },
              yAxis: {
                type: 'value',
                show: false,
                min: Math.min(...this.data),
              },
              series: [{
                data: this.data,
                type: 'line',
                lineStyle: {
                  color: '#343B5B',
                },
                areaStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 0.4,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(52, 59, 91, 0.4)',
                        },
                        {
                          offset: 1,
                          color: '#fff',
                        },
                      ],
                    },
                  },
                },
                symbolSize: 0,
              }],
            }}
          />
      </div>
      </div>
    );
  },
};

export default CoinLineChart;
