import { FormModel, Row, Select, Col, Button, Cascader, Icon } from 'ant-design-vue';
import isEmpty from 'lodash/isEmpty';
import slice from 'lodash/slice';
import fill from 'lodash/fill';
import { mapState, mapActions } from 'vuex';
import { RANK, GET_HISTORY_RANK_INFO, GET_HISTORY_DURATION } from '@/modules/rank';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import BaseContainer from '@/shared/components/BaseContainer';
import RankCard from '@/shared/components/RankCard';
import NoData from '@/shared/components/NoData';
import { getIsEnglish } from '@/shared/utils/getLocalLanguage';
import { INCOME, ANGEL, BUYER, rankTypeMap } from '../consts/rankType';
import styles from './index.less?module';

const { Item } = FormModel;

const HistoryRank = {
  props: {},
  data() {
    return {
      selectDuration: [],
      isEnglish: getIsEnglish(),
      rankType: this.$route.query.rankType || INCOME,
    };
  },
  computed: {
    ...mapState({
      info: state => state.rank.historyRankInfo,
      historyDuration: state => state.rank.historyDuration,
      searchLoading: state => state.loading.effects[`${RANK}/${GET_HISTORY_RANK_INFO}`],
    }),
    options() {
      return this.historyDuration.map(item => {
        item.label = this.$t('year', { value: item.year });
        item.value = item.year;
        item.children = item.list.map(subItem => {
          subItem.label = `${this.$t('issue', { value: `${subItem.number}`.padStart(2, 0) })} (${subItem.date})`;
          subItem.value = subItem.duration;
          return subItem;
        });
        return item;
      });
    },
    formatTopList() {
      if (isEmpty(this.info)) {
        return [];
      }
      const { length } = this.info.topList;
      if (length < 10 && length > 0) {
        return [...this.info.topList, ...fill(new Array(10 - length), {})];
      }
      return this.info.topList;
    },
    unit() {
      return this.$route.query.rankType === BUYER ? 'T' : 'USDT';
    },
  },
  mounted() {
    this[GET_HISTORY_RANK_INFO]({ topType: rankTypeMap[this.rankType] });
    this[GET_HISTORY_DURATION](rankTypeMap[this.rankType]);
  },
  methods: {
    ...mapActions(RANK, [GET_HISTORY_RANK_INFO, GET_HISTORY_DURATION]),
    handleRankTypeChange(value) {
      this.$router.replace({ query: { ...this.$route.query, rankType: value } });
      this.selectDuration = [];
      this[GET_HISTORY_DURATION](rankTypeMap[value]);
    },
    displayRender({ selectedOptions }) {
      if (!isEmpty(selectedOptions)) {
        const [{ label: year }, { number }] = selectedOptions;
        return <span class={styles['period-text']}>{`${year}${this.$t('period', { value: number })}`}</span>;
      }
      return <div />;
    },
    onSearch() {
      const [, duration] = this.selectDuration;
      const { rankType } = this.$route.query;
      this[GET_HISTORY_RANK_INFO]({ duration, topType: rankTypeMap[rankType] });
    },
  },
  render() {
    const rankTypeColumns = [
      { value: INCOME, text: this.$t('totalIncomeRank') },
      { value: ANGEL, text: this.$t('angelRank') },
      { value: BUYER, text: this.$t('newBuyRank') },
    ];

    const { sort, nickName, amount, avatar, userId } = this.info;
    const topFive = slice(this.formatTopList, 0, 5);
    const topFiveAfter = slice(this.formatTopList, 5, 10);

    return (
      <BaseContainer class={styles['history-rank-bg']} contentClassName={styles['history-rank-content']}>
        <FormModel class="normal-form">
          <Row type="flex" justify="center" align="bottom" gutter={[24, 0]}>
            <Col span={5}>
              <Item label={this.$t('rankType')}>
                <Select
                  onChange={this.handleRankTypeChange}
                  defaultValue={this.rankType}
                  optionLabelProp="label"
                  suffixIcon={<TriangleFilled className="select-icon" />}
                  dropdownMatchSelectWidth={false}
                >
                  {rankTypeColumns.map(({ value, text }) => (
                    <Select.Option key={value} label={text}>
                      {text}
                    </Select.Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span={8}>
              <Item label={this.$t('periodsNumber')}>
                <Cascader
                  v-model={this.selectDuration}
                  options={this.options}
                  popupClassName={styles['cascader-popup']}
                  matchInputWidth
                  placeholder={this.$t('pleaseSelectPeriod')}
                  scopedSlots={{
                    suffixIcon: () => <Icon type="calendar" />,
                    displayRender: this.displayRender,
                  }}
                />
              </Item>
            </Col>
            <Col>
              <Button
                class={styles['inquiry-button']}
                loading={this.searchLoading}
                type="primary"
                onClick={this.onSearch}
              >
                {this.$t('inquiry')}
              </Button>
            </Col>
          </Row>
        </FormModel>
        <div class={[styles['my-ranking'], { [styles['en-my-ranking']]: this.isEnglish }]}>
          <Row gutter={[30, 0]}>
            <Col span={12}>
              <RankCard
                isShowLogin={!userId}
                position={sort}
                amount={amount}
                name={nickName}
                avatar={avatar}
                unit={this.unit}
              />
            </Col>
            <Col span={12} />
          </Row>
        </div>
        <div class={[styles['all-ranking'], { [styles['en-all-ranking']]: this.isEnglish }]}>
          <Row gutter={[30, 0]}>
            <Col span={12}>
              {topFive.map((item, index) => (
                <RankCard
                  position={index + 1}
                  amount={item.amount}
                  name={item.nickName}
                  avatar={item.avatar}
                  unit={this.unit}
                />
              ))}
            </Col>
            <Col span={12}>
              {topFiveAfter.map((item, index) => (
                <RankCard
                  position={index + 6}
                  amount={item.amount}
                  name={item.nickName}
                  avatar={item.avatar}
                  unit={this.unit}
                />
              ))}
            </Col>
            {isEmpty(this.formatTopList) && (
              <Col span={24}>
                <NoData class={styles['no-data']} />
              </Col>
            )}
          </Row>
        </div>
        {this.rankType === INCOME && (
          <div class={styles['rules-text']}>
            <div>{this.$t('incomeRankRule1')}</div>
            <div>{this.$t('incomeRankRule2')}</div>
          </div>
        )}
        {this.rankType === ANGEL && (
          <div class={styles['rules-text']}>
            <div>{this.$t('newBuyRankRule1')}</div>
            <div>{this.$t('newBuyRankRule2')}</div>
          </div>
        )}
        {this.rankType === BUYER && (
          <div class={styles['rules-text']}>
            <div>{this.$t('angelRankRule1')}</div>
            <div>{this.$t('angelRankRule2')}</div>
            <div>{this.$t('angelRankRule3')}</div>
            <div>{this.$t('angelRankRule4')}</div>
          </div>
        )}
      </BaseContainer>
    );
  },
};

export default HistoryRank;
