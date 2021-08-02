import locationServices from '@/shared/services/location/locationServices';

// fix ie not popup
let message;
const beforeunloadEvent = e => {
  (e || window.event).returnValue = message;
  return message;
};
const listenBeforeunload = () => {
  window.addEventListener('beforeunload', beforeunloadEvent);
};
const removeListenBeforeunload = () => {
  window.removeEventListener('beforeunload', beforeunloadEvent);
};

class LocationHelp {
  constructor() {
    this.beforeunloadPrompt = false;
    this.notExecuteUnloadCallback = false;
  }

  initPromptWhenLeavePage(options) {
    message = options.message;
    if (!this.beforeunloadPrompt) {
      this.unloadHook = options.unloadHook;
      listenBeforeunload();
      this.beforeunloadPrompt = true;
    }
  }

  open = (url, options) => {
    const finalURL = locationServices.buildURL(url, options);
    window.open(finalURL);
  }

  redirect(url, { notExecuteUnloadCallback = false, defaultConfirm = false } = {}) {
    const { beforeunloadPrompt } = this;

    if (!beforeunloadPrompt) {
      location.href = url;
      return;
    }
    const result = defaultConfirm || confirm(message);
    if (result) {
      this.notExecuteUnloadCallback = notExecuteUnloadCallback;
      this.destroy();
      this.unloadHook && this.unloadHook();
      location.href = url;
    }
  }

  destroy() {
    removeListenBeforeunload();
    this.beforeunloadPrompt = false;
  }
}
export default new LocationHelp();
