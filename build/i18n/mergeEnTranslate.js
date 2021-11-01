import fs from 'fs';
import 'colors';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import enUSMessageMap from '../../i18n/locales/en-US.json';
import mobileEnMessagesMap from '../../enSourceLocal/mobileUS';
import mobileCnMessagesMap from '../../enSourceLocal/mobileCN';
import zhCNMessageMap from '../../src/shared/intl/messages/index';

const getContent = msgObject => JSON.stringify(msgObject, null, 2);

const exportFrTranslateFile = () => {
  const enResultMap = {};

  forEach(zhCNMessageMap, (value, key) => {
    if (mobileEnMessagesMap[key]) {
      enResultMap[key] = mobileEnMessagesMap[key];
    }
    // eslint-disable-next-line max-len
    if (includes(mobileCnMessagesMap, value) && !enResultMap[key]) {
      console.log('--mobile', `${value}`.red);
    }

    // if (enUSMessageMap[key]) {
    //   enResultMap[key] = value;
    // }

    fs.writeFileSync('i18n/locales/en-US.json', getContent(enResultMap));
  });
  console.log('success'.green);
};

exportFrTranslateFile();
