import JsCrypto from 'jscrypto';
/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
/**
 * crypto-js ie11 兼容性有问题使用jscrypto替代
 * https://www.npmjs.com/search?q=jscrypto
 * https://github.com/Hinaser/jscrypto/blob/master/API.md#hmac-sha384
 *
 */
// export function aesEncrypt(word, keyWord = 'XwKsGlMcdPMEhR1B') {
//   const key = CryptoJS.enc.Utf8.parse(keyWord);
//   console.log('key', key);

//   const srcs = CryptoJS.enc.Utf8.parse(word);
//   const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
//   return encrypted.toString();
// }

export function aesEncrypt(word, keyWord = 'XwKsGlMcdPMEhR1B') {
  const key = JsCrypto.Utf8.parse(keyWord);
  const srcs = JsCrypto.Utf8.parse(word);
  const encrypted = JsCrypto.AES.encrypt(srcs, key, { mode: JsCrypto.mode.ECB, padding: JsCrypto.pad.Pkcs7 });
  return encrypted.toString();
}
