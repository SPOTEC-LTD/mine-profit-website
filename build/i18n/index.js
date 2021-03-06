/* eslint-disable global-require */
import fs from 'fs';
import colors from 'colors';
import glob from 'glob';
import path from 'path';
import forEach from 'lodash/forEach';
import endsWith from 'lodash/endsWith';
import zhCNMessageMap from '../../src/shared/intl/messages/index';

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

const getMessagesFilePaths = () => new Promise((resolve, reject) => {
  glob('src/shared/intl/messages/**/*.js',
    { dot: true },
    (error, filePath) => (error ? reject(error) : resolve(filePath)));
});

const checkI18n = () => {
  getMessagesFilePaths().then(filePaths => {
    const allMessagesMap = {};
    const messagefilePaths = filePaths.filter(filePath => !endsWith(filePath, 'index.js'));
    messagefilePaths.forEach(filePath => {
      // eslint-disable-next-line import/no-dynamic-require
      const messageMap = require(resolveCwd(filePath)).default;
      forEach(messageMap, (value, key) => {
        if (allMessagesMap[key]) {
          console.log(colors.red(`i18n ${key} Already defined`));
        }
      });

      Object.assign(allMessagesMap, messageMap);
    });
  });
};

const buildI18n = () => {
  const messagesObject = {};
  forEach(zhCNMessageMap, (value, key) => {
    messagesObject[key] = value;
  });

  const content = JSON.stringify(messagesObject, null, 2);

  !fs.existsSync('i18n') && fs.mkdirSync('i18n');
  !fs.existsSync('i18n/locales/en-US.json') && fs.writeFileSync('i18n/locales/en-US.json', '');
  fs.writeFileSync('i18n/locales/zh-CN.json', content);
  console.log(colors.green(('i18n Compiled successfully')));
};

buildI18n();
if (process.env.NODE_ENV !== 'production') {
  checkI18n();
}
