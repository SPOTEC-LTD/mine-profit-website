import { transactionsPath } from '@/router/consts/urls';
import NewWindowGuide from '@/shared/components/NewWindowGuide';
import locationHelp from '@/shared/utils/locationHelp';
import DetailTable from '../components/DetailTable';

import styles from './index.less?module';

const Detail = {
  render() {
    const columns = [
      { title: this.$t('time'), width: 170 },
      { title: this.$t('walletType') },
      { title: this.$t('coinNumber'), width: 200 },
      { title: this.$t('status') },
    ];
    return (
      <div class={styles['detail-list']}>
        <DetailTable
          pagination={false}
          scroll={{ y: 245 }}
          columnsConfig={columns}
          query={{ pageNum: 1, pageSize: 30 }}
        />
        <div class={styles['bottom-guide']}>
          <NewWindowGuide
            label={this.$t('walletDetailTitle')}
            onGuide={() => { locationHelp.open(transactionsPath); }}
          />
        </div>
      </div>
    );
  },
};

export default Detail;
