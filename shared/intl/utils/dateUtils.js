import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import isNumber from 'lodash/isNumber';
import isInteger from 'lodash/isInteger';
import { CN } from '../consts/languages';
import { dayjsLocaleMap } from '../consts/localeTypes';

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

const createMoment = value => {
  if (value) {
    const val = dayjs(value).utc().local();

    if (val.isValid()) {
      return val;
    }
  }

  return null;
};

class DateUtils {
  constructor() {
    this.currentDateFormat = 'YYYY-MM-DD';
    this.currentTimeFormat = 'HH:mm:ss';
    this.currentTimeZoneOffset = 28800000;

    Object.defineProperties(this, {
      locale: {
        get() {
          return this.currentLocale || CN;
        },
        set(v) {
          this.currentLocale = v;
          this.onIntlChange();
        },
      },
    });

    Object.defineProperties(this, {
      dateFormat: {
        get() {
          return this.currentDateFormat;
        },
        set(v) {
          this.currentDateFormat = v;
        },
      },
    });

    Object.defineProperties(this, {
      timeFormat: {
        get() {
          return this.currentTimeFormat;
        },
        set(v) {
          this.currentTimeFormat = v;
        },
      },
    });

    Object.defineProperties(this, {
      dateTimeFormat: {
        get() {
          return `${this.currentDateFormat} ${this.currentTimeFormat}`;
        },
      },
    });

    Object.defineProperties(this, {
      timeZoneOffset: {
        get() {
          return this.currentTimeZoneOffset;
        },
        set(v) {
          this.currentTimeZoneOffset = v;
        },
      },
    });
  }

  onIntlChange() {
    dayjs.locale(dayjsLocaleMap[this.currentLocale]);
  }

  parseDate(date, format) {
    return dayjs(date, format || this.dateFormat);
  }

  parseTime(time, format) {
    return dayjs(time, format || this.timeFormat);
  }

  parseDateTime(dateTime, format) {
    if (isNumber(dateTime)) {
      return dayjs(dateTime);
    }

    return dayjs(dateTime, format || this.dateTimeFormat);
  }

  formatDate(date, format) {
    const m = createMoment(date);

    return m ? m.format(format || this.dateFormat) : '';
  }

  formatTime(time, format) {
    const m = createMoment(time);
    return m ? m.format(format || this.timeFormat) : '';
  }

  formatDateTime(dateTime, format) {
    const m = createMoment(dateTime);
    return m ? m.format(format || this.dateTimeFormat) : '';
  }

  // eslint-disable-next-line class-methods-use-this
  formatToTimestamp(date) {
    return date.valueOf();
  }

  getToday() {
    if (isInteger(this.currentTimeZoneOffset)) {
      const offset = this.currentTimeZoneOffset;

      return dayjs().utc().utcOffset(offset, false).format('x');
    }
    return dayjs();
  }
}

export default new DateUtils();
