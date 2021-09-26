import locale from '@/shared/intl/utils/locale';
import bonusIcon1 from '@/assets/account/bonus-icon-1.png';
import bonusIcon2 from '@/assets/account/bonus-icon-2.png';
import bonusIcon3 from '@/assets/account/bonus-icon-3.png';
import bonusIcon4 from '@/assets/account/bonus-icon-4.png';
import bonusIcon5 from '@/assets/account/bonus-icon-5.png';

const DIRECTLY_INVITED_OUTPUT = 1;
const DIRECT_INVITATION_PURCHASE = 2;
const INDIRECT_OUTPUT = 3;
const INDIRECT_PURCHASE = 4;
const OUTPUT_BONUS = 5;

export { INDIRECT_PURCHASE, OUTPUT_BONUS, DIRECTLY_INVITED_OUTPUT, DIRECT_INVITATION_PURCHASE, INDIRECT_OUTPUT };

export const getBonusTypeLabelMap = () => ({
  [DIRECTLY_INVITED_OUTPUT]: locale.t('directlyInvitedOutput'),
  [DIRECT_INVITATION_PURCHASE]: locale.t('directInvitationPurchase'),
  [INDIRECT_OUTPUT]: locale.t('indirectOutput'),
  [INDIRECT_PURCHASE]: locale.t('indirectPurchase'),
  [OUTPUT_BONUS]: locale.t('ratioDialogOutputAddition'),
});

export const getBonusTypeNotificationMap = value => ({
  [DIRECTLY_INVITED_OUTPUT]: locale.t('directlyInvitedOutputNotification', { value }),
  [DIRECT_INVITATION_PURCHASE]: locale.t('directInvitationPurchaseNotification', { value }),
  [INDIRECT_OUTPUT]: locale.t('indirectOutputNotification', { value }),
  [INDIRECT_PURCHASE]: locale.t('indirectPurchaseNotification', { value }),
  [OUTPUT_BONUS]: locale.t('outputBonusNotification', { value }),
});

export const getBonusTypeIconMap = () => ({
  [DIRECTLY_INVITED_OUTPUT]: bonusIcon1,
  [DIRECT_INVITATION_PURCHASE]: bonusIcon2,
  [INDIRECT_OUTPUT]: bonusIcon3,
  [INDIRECT_PURCHASE]: bonusIcon4,
  [OUTPUT_BONUS]: bonusIcon5,
});
