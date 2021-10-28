import numberUtils from 'aa-utils/lib/numberUtils';

import { EthIcon, BtcIcon } from '@/shared/components/ChainIcon';
import BaseModal from '@/shared/components/BaseModal';
import ProgressLoop from '@/shared/components/ProgressLoop';
import pageTwoImage from '@/assets/stationMail/page-two-image.png';
import bubbleArrowIcon from '@/assets/stationMail/bubble-arrow.png';

import styles from './index.less?module';

const WeeklyOutputReportModal = {
  props: {
    value: Boolean,
    reportInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    getContentLeft() {
      const { amount, btcAmount, ethAmount, weeklyRanking, btcPercentage } = this.reportInfo;
      const percentMoreThan = numberUtils.formatBigFloatNumber(
        numberUtils.times(weeklyRanking, 100).toString(),
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      );
      const chainIncomeList = [
        { chain: 'BTC', income: btcAmount, icon: <BtcIcon /> },
        { chain: 'ETH', income: ethAmount, icon: <EthIcon /> },
      ];

      return (
        <div class={styles['content-left']}>
          <ProgressLoop
            className={styles['progress-loop']}
            width={174}
            strokeWidth={14}
            trailColor='#333a5e'
            strokeColor='#ff9a00'
            percent={numberUtils.minus(1, btcPercentage)}
          >
            <div class={styles['circle-income']}>
              <div>{this.$t('equivalentIncome')}</div>
              <div class={styles['equivalent-income']}>
                {numberUtils.formatNumber(amount, {
                  minimumFractionDigits: 2,
                  useGrouping: false,
                })}
              </div>
              <div>USDT</div>
            </div>
          </ProgressLoop>
          <div class={styles['income-list']}>
            {chainIncomeList.map(({ chain, income, icon }) => (
              <div class={styles['income-box']}>
                <div class={styles['chain-name']}>
                  {icon}
                  <span>{chain}</span>
                </div>
                <div>
                  {numberUtils.formatNumber(income, {
                    maximumFractionDigits: 8,
                    usePlus: income > 0,
                  })}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div class={styles['one-bottom']}>
              <div>{this.$t('incomeMoreThan')}</div>
              <span class={styles['percent-num']}>
                {percentMoreThan}
              </span>
              <div>
                <span class={styles['percent-sign']}>%</span>
                &nbsp;&nbsp;{this.$t('mpUsers', { enProductName: this.$t('enProductName') })}</div>
            </div>
            <div class={styles['progress-box']}>
              <div style={{ width: `${percentMoreThan}%` }} class={styles['progress-color']} />
            </div>
          </div>
        </div>
      );
    },

    getContentRight() {
      const { desc, annualizedRateOfReturn } = this.reportInfo;

      return (
        <div class={styles['content-right']}>
          <div class={styles['content-main']}>
            <div class={styles['income-rate']}>{this.$t('investItemAnnualRate')}</div>
            <div class={styles['income-percent']}>
              {numberUtils.formatPercent(
                annualizedRateOfReturn,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  usePlus: annualizedRateOfReturn > 0,
                },
              )}
            </div>
          </div>
          <div class={styles['content-main']}>
            <div class={styles['income-tip']}>{desc}</div>
            <img class={styles['income-icon']} src={bubbleArrowIcon} alt="" />
            <img class={styles['income-img']} src={pageTwoImage} alt="" />
          </div>
        </div>
      );
    },

    getModalContent() {
      return (
        <div class={styles.content}>
          <div class={styles['content-box']}>
            {this.getContentLeft()}
            {this.getContentRight()}
          </div>
          <div
            class={styles['nice-button']}
            onClick={() => { this.$refs.outputReport.close(); }}
          >
            {this.$t('nice')}
          </div>
        </div>
      );
    },
  },

  render() {
    return (
      <BaseModal
        ref='outputReport'
        value={this.value}
        title={`${this.$t('weeklyOutputReport')}${this.reportInfo.miningCycle}`}
        width={845}
        onClose={() => { this.$emit('close'); }}
        scopedSlots={{
          content: () => this.getModalContent(),
        }}
      />
    );
  },
};

export default WeeklyOutputReportModal;
