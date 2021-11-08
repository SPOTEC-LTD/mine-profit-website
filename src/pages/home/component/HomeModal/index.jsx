import BaseModal from '@/shared/components/BaseModal';

import styles from './index.less?module';

const HomeModal = {
  render() {
    return (
      <BaseModal
        value={true}
        width={389}
        maskClosable={false}
        iconClassName={styles['close-icon-wrap']}
        wrapClassName={styles['home-modal']}
        scopedSlots={{
          content: this.$scopedSlots.content,
        }}
        {...{
          on: this.$listeners,
          attrs: this.$attrs,
        }}
      />
    );
  },
};

export default HomeModal;
