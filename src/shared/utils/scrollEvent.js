import isUndefined from 'lodash/isUndefined';

const scrollEvent = (fetchList, option = {}) => {
  const { target, bottomHeight } = option;
  const resultTargetDom = target || document;
  const footerHeight = bottomHeight || 403;
  let scrollTop = 0;
  if (isUndefined(resultTargetDom.scrollTop)) {
    scrollTop = resultTargetDom.documentElement.scrollTop
    || resultTargetDom.body.scrollTop;
  } else {
    scrollTop = resultTargetDom.scrollTop;
  }
  const windowHeight = resultTargetDom.clientHeight
    || resultTargetDom.documentElement.clientHeight
    || resultTargetDom.body.clientHeight;
  const scrollHeight = resultTargetDom.scrollHeight
    || resultTargetDom.documentElement.scrollHeight
    || resultTargetDom.body.scrollHeight;
  if (scrollHeight - scrollTop - windowHeight <= footerHeight) {
    fetchList();
  }
};

export default scrollEvent;
