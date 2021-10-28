import ruleIcon1 from '@/assets/account/rule-icon-1.png';
import ruleIcon2 from '@/assets/account/rule-icon-2.png';
import ruleIcon3 from '@/assets/account/rule-icon-3.png';
import ruleIcon4 from '@/assets/account/rule-icon-4.png';

import styles from './index.less?module';

const PromoteRules = {
  render() {
    const ruleList = [
      {
        icon: ruleIcon1,
        text: this.$t('iconRuleText1', { enProductName: this.$t('enProductName') }),
      },
      {
        icon: ruleIcon2,
        text: this.$t('iconRuleText2'),
      },
      {
        icon: ruleIcon3,
        text: this.$t('iconRuleText3'),
      },
      {
        icon: ruleIcon4,
        text: this.$t('iconRuleText4'),
      },
    ];
    return (
      <div>
        <div class={styles['rules-content-wrap']}>
          {ruleList.map(item => (
            <div class={styles['rules-item']}>
              <img class={styles['rules-item-icon']} src={item.icon} alt="" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div class={styles['rules-detail-wrap']}>
          <span class={styles['rules-detail-title']}>{this.$t('rules')}</span>
          <div class={styles['rules-detail-content']}>
            <div>{this.$t('rule1')}</div>
            <div>{this.$t('rule2')}</div>
            <div>{this.$t('rule3')}</div>
            <div>{this.$t('rule4')}</div>
            <div>{this.$t('rule5')}</div>
            <div>{this.$t('rule6')}</div>
            <div>{this.$t('rule7')}</div>
            <div>{this.$t('rule8')}</div>
          </div>
        </div>
      </div>
    );
  },
};

export default PromoteRules;
