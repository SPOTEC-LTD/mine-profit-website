import fs from 'fs';
import glob from 'glob';
import program from 'commander';
import colors from 'colors';
import csvtojsonV2 from 'csvtojson';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';
import { createObjectCsvWriter } from 'csv-writer';
import enUsMessagesMap from '../../src/locales/en-US';
import zhCNMessageMap from '../../src/shared/intl/messages/index';

// npm run i18n:merge fileName (merge one file)
// npm run i18n:merge (merge all file)
// npm run i18n:export (export no translateList)

program
  .option('-f, --fileName, [value]', 'export source file name', '');

program.parse(process.argv);

const isExportNoTranslate = program.args[0];
const dynamicKeyExp = /\{.+?\}/g;

const getCsvPath = fileName => `translationFile/enCsv/${fileName}.csv`;
const getAllCsvPaths = () => new Promise(resolve => {
  glob(getCsvPath('*'), { }, (_, filePath) => (resolve(filePath)));
});

const extractCsv = path => new Promise((resolve, reject) => {
  csvtojsonV2()
    .fromFile(path)
    .then(messageList => resolve(messageList))
    .catch(error => {
      console.log(error.toString().red);
      reject(error);
    });
});

const getSourceMessageList = paths => Promise
  .all(paths.map(path => extractCsv(path)))
  .then(messageList => flatten(messageList));

const csvWriter = ({ fileName }) => createObjectCsvWriter({
  path: `noTranslate/${fileName}`,
  header: [
    { id: 'key', title: 'key' },
    { id: 'zhValue', title: 'zhValue' },
    { id: 'enValue', title: 'enValue' },
  ],
});

const getContent = msgObject => `/* eslint-disable */\nexport default ${JSON.stringify(msgObject, null, 2)}`;

const getTranslateStats = ({ nowBatchTranslateKeys, nowBatchTranslatelist, noTranslateList }) => {
  const translateSuccessMessageLength = nowBatchTranslateKeys.length;
  const translateMessageLength = nowBatchTranslatelist.length;
  const hasFailed = translateSuccessMessageLength !== translateMessageLength;

  if (hasFailed) {
    const translateMessageKeys = nowBatchTranslatelist.map(({ key }) => key);
    const failedKeys = difference(translateMessageKeys, nowBatchTranslateKeys);

    return {
      success: translateSuccessMessageLength,
      failed: translateMessageLength - translateSuccessMessageLength,
      failedKeys,
      noTranslate: noTranslateList.length,
    };
  }

  return {
    success: translateSuccessMessageLength,
    failed: 0,
    failedKeys: [],
    noTranslate: noTranslateList.length,
  };
};

const checkMissFrKeys = () => {
  const missFrKeys = {};
  forEach(zhCNMessageMap, (value, key) => {
    if (!enUsMessagesMap[key]) {
      missFrKeys[key] = value;
    }
  });
  console.log('missFrKeys', missFrKeys);
};

const checkDynamicKeyIsEqual = (zhValue, enValue) => {
  if (!dynamicKeyExp.test(enValue)) {
    return true;
  }

  return isEqual(zhValue.match(dynamicKeyExp), enValue.match(dynamicKeyExp));
};

const exportEnTranslateFile = params => {
  const { allTranslateMessageList, nowTranslateMessageList, isMergeAll } = params;
  const allEnTranslateMap = {};
  const nowBatchTranslateKeys = [];
  const noTranslateList = [];
  const nowBatchTranslatelist = isMergeAll ? allTranslateMessageList : nowTranslateMessageList;
  console.log('nowBatchTranslatelist', nowBatchTranslatelist);

  forEach(enUsMessagesMap, (value, key) => {
    const translateItem = find(nowBatchTranslatelist,
      // eslint-disable-next-line max-len
      ({ key: translatedKey, zhValue }) => {
        if (translatedKey === key) {
          console.log('merge failedKeys:'.red, `${key}:${value}`.red);
        }
        // key and enValue all equal, fix the key does not change but the value has updated
        return translatedKey === key;
      });

    const dynamicKeyIsEqual = translateItem
      && checkDynamicKeyIsEqual(zhCNMessageMap[key], translateItem.enValue);

    if (translateItem && dynamicKeyIsEqual) {
      allEnTranslateMap[key] = translateItem.enValue;
      nowBatchTranslateKeys.push(key);
    } else {
      allEnTranslateMap[key] = value;
    }
  });

  forEach(zhCNMessageMap, (value, key) => {
    const translateItem = find(allTranslateMessageList,
      ({ key: translatedKey, zhValue }) => translatedKey === key);
    if (!translateItem) {
      // if (/[A-Za-z]/.test(value.replace(dynamicKeyExp, ''))) {
      noTranslateList.push({ key, zhValue: value });
      // } else {
      //   isExportNoTranslate && console.log('export failedKeys:'.red, `${key}:${value}`.red);
      // }
    }
  });

  if (isExportNoTranslate) {
    checkMissFrKeys();
    !fs.existsSync('noTranslate') && fs.mkdirSync('noTranslate');
    // export no translate list

    csvWriter({ fileName: 'zhNoTranslate.csv' })
      .writeRecords(noTranslateList)
      .then(() => console.log('The zhNoTranslate file was written successfully'.green));
  }

  const translateStats = getTranslateStats({
    nowBatchTranslateKeys, nowBatchTranslatelist, noTranslateList,
  });

  // export all fr-CA translate file
  translateStats.success && fs.writeFileSync('src/locales/en-US.js', getContent(allEnTranslateMap));

  console.log(`success: ${translateStats.success}`.green);
  console.log(`noTranslate: ${translateStats.noTranslate}`.yellow);
  console.log(`failed: ${translateStats.failed}`.red);
  if (translateStats.failed) {
    console.log('failedKeys:'.red);
    translateStats.failedKeys.forEach(value => {
      console.log(value.red);
    });
  }
};

const mergeTranslate = () => {
  getAllCsvPaths()
    .then(enCAPathList => getSourceMessageList(enCAPathList))
    .then(allTranslateMessageList => {
      if (program.fileName) {
        extractCsv(getCsvPath(program.fileName))
          .then(nowTranslateMessageList => {
            const params = { allTranslateMessageList, nowTranslateMessageList, isMergeAll: false };
            exportEnTranslateFile(params);
          });
      } else {
        const params = { allTranslateMessageList, nowTranslateMessageList: [], isMergeAll: true };
        exportEnTranslateFile(params);
      }
    });
};

mergeTranslate();
