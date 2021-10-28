import { mapActions, mapState, mapMutations } from 'vuex';
import { Tooltip } from 'ant-design-vue';
import { PLATFORM_CURRENCY, GET_PLATFORM_CURRENCY_DETAIL, GET_DYNAMIC_CHAIN_INFO } from '@/modules/platformCurrency';
import formula from '@/assets/platformCurrency/formula.png';
import formula2 from '@/assets/platformCurrency/formula-2.png';
import formula3 from '@/assets/platformCurrency/formula-3.png';
import chart from '@/assets/platformCurrency/chart.png';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { columns, dataSource } from '../consts/tableValue';
import CoinPriceTable from '../components/CoinPriceTable';
import styles from './index.less?module';

const PlatformCurrencyDetail = {
  computed: {
    ...mapState({
      platformCurrencyDetail: state => state.platformCurrency.platformCurrencyDetail,
      dynamicChainInfo: state => state.platformCurrency.dynamicChainInfo,
      loading: state => state.loading.effects[`${PLATFORM_CURRENCY}/${GET_PLATFORM_CURRENCY_DETAIL}`]
    }),
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
    this[GET_PLATFORM_CURRENCY_DETAIL]();
    this[GET_DYNAMIC_CHAIN_INFO]();
  },
  methods: {
    ...mapActions(PLATFORM_CURRENCY, [GET_PLATFORM_CURRENCY_DETAIL, GET_DYNAMIC_CHAIN_INFO]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    downloadWhitePaper() {
      const downloadElement = document.createElement('a');
      downloadElement.href = this.platformCurrencyDetail.introUrl;
      downloadElement.download = this.$t('whitePaper');
      downloadElement.target = '_blank';
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
    },
    chartContent() {
      return (
        <div class={styles['chart-content-wrap']}>
          <div>
            <div class={styles['chart-content-title']}>{this.$t('illustrate')}</div>
            <div>2021.12.18 100W</div>
            <div>2022.06.18 18000W</div>
            <div>2022.12.18 27000W</div>
            <div>2023.06.18 31500W</div>
            <div>2023.12.18 33750W</div>
            <div>X 36000W</div>
          </div>
        </div>
      );
    },
  },
  render() {
    const { yesterdayProfit, yesterdayInject, fundPoolRest, totalInject, payback } = this.platformCurrencyDetail;
    const { symbol: name, fullName } = this.dynamicChainInfo;
    const capitalPoolColumns = [
      {
        title: this.$t('time'),
      },
      {
        title: this.$t('proportionRepurchaseFunds'),
      },
    ];

    const capitalPoolDataSource = [
      [`1-180${this.$t('day')}`, '1%'],
      [`181-360${this.$t('day')}`, '2%'],
      [`361-540${this.$t('day')}`, '4%'],
      [`541-720${this.$t('day')}`, '8%'],
      [`721-900${this.$t('day')}`, '16%'],
      [`901-1080${this.$t('day')}`, '32%'],
      [`1081-${this.$t('day')}`, '64%'],
    ];

    const currentDataList = [
      {
        label: this.$t('yesterdayProfit'),
        value: yesterdayProfit,
      },
      {
        label: this.$t('yesterdayInject'),
        value: yesterdayInject,
      },
      {
        label: this.$t('fundPoolRest'),
        value: fundPoolRest,
      },
      {
        label: this.$t('totalInject'),
        value: totalInject,
      },
      {
        label: this.$t('payback'),
        value: payback,
      },
    ];

    return (
      <BaseContainer contentClassName={styles.wrapper}>
        <div class={styles.content}>
          <div class={styles['article-title']}>{this.$t('detail_article_title', { name })}</div>
          <div>
            <div class={styles.title}>{this.$t('detail_1_title')}</div>
            <div>{this.$t('detail_1_text_1', { name, fullName, enProductName: this.$t('enProductName') })}</div>
            <br />
            <div>{this.$t('detail_1_text_2', { name, enProductName: this.$t('enProductName') })}</div>
            <br />
            <div>{this.$t('detail_1_text_3', { name, enProductName: this.$t('enProductName') })}</div>
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_2_title')}</div>
            <div>{this.$t('detail_2_title_1', { name })}</div>
            <div>{this.$t('detail_2_title_2')}</div>
            <div>
              <img class={styles.formula} src={formula} alt="" />
            </div>
            <Tooltip placement="right" scopedSlots={{ title: this.chartContent }}>
              <img class={styles.chart} src={chart} alt="" />
            </Tooltip>
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_3_title')}</div>
            <div>{this.$t('detail_3_text')}</div>
            <img class={styles.formula} src={formula2} alt="" />
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_4_title')}</div>
            <div>{this.$t('detail_4_text_1')}</div>
            <div>{this.$t('detail_4_text_2')}</div>
            <div>{this.$t('detail_4_text_3')}</div>
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_5_title')}</div>
            <div>{this.$t('detail_5_text', { name })}</div>
            <CoinPriceTable
              className={styles['capital-table']}
              columns={capitalPoolColumns}
              dataSource={capitalPoolDataSource}
            />
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_6_title')}</div>
            <div class={styles['data-wrap']}>
              {currentDataList.map(item => (
                <div class={styles['data-item']}>
                  <span>{item.label}</span>
                  <div>
                    <span class={styles['data-value']}>{bigNumberToFixed(item.value, 10)}</span>
                    <span class={styles['data-unit']}>USDT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_7_title')}</div>
            <img class={styles.formula} src={formula3} alt="" />
          </div>
          <div>
            <div class={styles.title}>{this.$t('detail_8_title', { name })}</div>
            <div>{this.$t('detail_8_text_1', { name })}</div>
            <br />
            <div>{this.$t('detail_8_text_2')}</div>
            <div>{this.$t('detail_8_text_3', { enProductName: this.$t('enProductName') })}</div>
            <div>{this.$t('detail_8_text_4', { enProductName: this.$t('enProductName') })}</div>
            <div>{this.$t('detail_8_text_5')}</div>
            <div class={styles['sub-desc']}>
              <div>{this.$t('detail_8_text_6')}</div>
              <div>{this.$t('detail_8_text_7', { name })}</div>
            </div>
            <br />
            <div>{this.$t('detail_8_text_8')}</div>
            <CoinPriceTable className={styles['price-table']} dataSource={dataSource()} columns={columns()} />
            <div class={styles['table-remark']}>{this.$t('introduction_table_remark')}</div>
          </div>
        </div>
        <PageButton disabled={this.loading} type="primary" onClick={this.downloadWhitePaper}>
          {this.$t('downloadWhitePaper')}
        </PageButton>
      </BaseContainer>
    );
  },
};

export default PlatformCurrencyDetail;
