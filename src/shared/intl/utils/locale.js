class Locale {
  init(i18nInstance) {
    this.currentLocale = i18nInstance.locale;
    this.setIntlObject(i18nInstance);
  }

  setIntlObject(i18nInstance) {
    ['t', 'tc', 'te'].forEach(methodName => {
      this[methodName] = (...rest) => {
        if (i18nInstance[methodName]) {
          return i18nInstance[methodName].call(i18nInstance, ...rest);
        }

        return null;
      };
    });
  }
}

export default new Locale();
