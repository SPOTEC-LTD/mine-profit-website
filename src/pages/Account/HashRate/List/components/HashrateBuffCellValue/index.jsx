import { mapActions, mapState, mapMutations } from 'vuex';
import classNames from 'classnames';
import InfoModal from '@/shared/components/InfoModal';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import {
  HASH_RATE, GET_ORDINARY_HASHRATE_BUFF, GET_CLOSE_HASHRATE_BUFF, UPDATE_HASHRATE_BUFF_LIST,
} from '@/modules/account/hashRate';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import HashrateBuffDetails from '../HashrateBuffDetails';

import styles from './index.less?module';

const HashrateBuffCellValue = {
  props: {
    data: Object,
  },
  computed: {
    ...mapState({
      ordinaryHashrateLoading: state => state.loading.effects[`${HASH_RATE}/${GET_ORDINARY_HASHRATE_BUFF}`],
      closeHashrateLoading: state => state.loading.effects[`${HASH_RATE}/${GET_CLOSE_HASHRATE_BUFF}`],
    }),
    loading() {
      if (this.data.sourceType !== undefined) {
        return this.closeHashrateLoading;
      }
      return this.ordinaryHashrateLoading;
    },
  },
  methods: {
    ...mapActions(HASH_RATE, [GET_ORDINARY_HASHRATE_BUFF, GET_CLOSE_HASHRATE_BUFF]),
    ...mapMutations(HASH_RATE, [UPDATE_HASHRATE_BUFF_LIST]),
    onOpen() {
      const { hashrateType, productTemplateId, sourceType, id } = this.data;
      if (sourceType !== undefined) {
        this[GET_CLOSE_HASHRATE_BUFF]({ sourceType, hashrateType, id });
      } else {
        this[GET_ORDINARY_HASHRATE_BUFF]({ productTemplateId, hashrateType });
      }
    },
    onClosedModal() {
      this[UPDATE_HASHRATE_BUFF_LIST]([]);
    },
  },
  render() {
    const amountBuffHasValue = this.data.amountBuff > 0;

    return (
      <CellValue
        scopedSlots={{
          value: () => (
            <InfoModal
              disabled={!amountBuffHasValue}
              onOpen={this.onOpen}
              onClosed={this.onClosedModal}
              scopedSlots={{
                content: () => <HashrateBuffDetails loading={this.loading} />,
              }}>
              <span
                class={classNames({ 'modal-text-link': amountBuffHasValue }, { [styles['no-amount']]: !amountBuffHasValue })}
              >
                {amountBuffHasValue ? bigNumberToFixed(this.data.amountBuff, 2) : '-'}
              </span>
            </InfoModal>
          ),
        }}
        unit={this.data.unit}
        showIcon={amountBuffHasValue}
      />
    );
  },
};

export default HashrateBuffCellValue;
