import { mapActions, mapState, mapMutations } from 'vuex';
import {
  HASH_RATE,
  GET_HASHRATE_PLEDGES_SOURCE_INFO,
  UPDATE_HASHRATE_PLEDGES_SOURCE_INFO,
} from '@/modules/account/hashRate';
import BaseModal from '@/shared/components/BaseModal';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
// import PledgesHashrateDetails from '../PledgesHashrateDetails';

const PledgesHashrateCellValue = {
  props: {
    data: Object,
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects[`${HASH_RATE}/${GET_HASHRATE_PLEDGES_SOURCE_INFO}`],
    }),
  },
  methods: {
    ...mapActions(HASH_RATE, [GET_HASHRATE_PLEDGES_SOURCE_INFO]),
    ...mapMutations(HASH_RATE, [UPDATE_HASHRATE_PLEDGES_SOURCE_INFO]),
    onOpen() {
      this[GET_HASHRATE_PLEDGES_SOURCE_INFO]({ id: this.data.id });
    },
    onClosedModal() {
      this[UPDATE_HASHRATE_PLEDGES_SOURCE_INFO]([]);
    },
  },
  render() {
    return (
      <CellValue
        scopedSlots={{
          value: () => (
            <BaseModal
              disabled={this.data.amount <= 0}
              onOpen={this.onOpen}
              onClosed={this.onClosedModal}
              hiddenButton
              close-on-click-overlay
              scopedSlots={{
                content: () => '<PledgesHashrateDetails loading={this.loading} />',
              }}>
              <span class="modal-text-link">{this.data.amount}</span>
            </BaseModal>
          ),
        }}
        unit={this.data.unit}
        showIcon
      />
    );
  },
};

export default PledgesHashrateCellValue;
