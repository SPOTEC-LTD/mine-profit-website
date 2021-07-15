import isNull from 'lodash/isNull';

export default {
  set(key, value) { // 存储单个属性
    window.localStorage.setItem(key, value);
  },
  get(key) { // 读取单个属性
    return window.localStorage.getItem(key);
  },
  setObject(key, value) { // 存储对象，以JSON格式
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getObject(key) { // 读取对象，以JSON格式
    const value = window.localStorage.getItem(key);
    let result = {};

    try {
      result = JSON.parse(value);
    } catch (error) {
      console.log('error');
    }

    return isNull(result) ? {} : result;
  },
};
