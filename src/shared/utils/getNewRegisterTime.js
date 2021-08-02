import dayjs from 'dayjs';
import numberUtils from 'aa-utils/lib/numberUtils';
import dateUtils from '@/shared/intl/utils/dateUtils';
import localStorage from '@/shared/utils/localStorage';

function getNewRegisterTime() {
  const { createTime } = localStorage.getObject('userInfo') || { createTime: null };
  const loginAfterSevenDays = dateUtils.formatToTimestamp(dayjs(createTime).add(7, 'day'));
  const nowTime = dateUtils.formatToTimestamp(dateUtils.getToday());
  const logOutAfterSevenDays = dateUtils.formatToTimestamp(dayjs(nowTime).add(7, 'day'));

  const logoutRestTime = numberUtils.minus(logOutAfterSevenDays, nowTime);
  const loginRestTime = numberUtils.minus(loginAfterSevenDays, nowTime);
  const countDownTime = createTime ? loginRestTime : logoutRestTime;
  const endTime = createTime ? loginAfterSevenDays : logOutAfterSevenDays;

  const timeData = { endTime, countDownTime };
  return timeData;
}

export default getNewRegisterTime;
