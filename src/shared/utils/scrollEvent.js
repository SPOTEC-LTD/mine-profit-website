const scrollEvent = (fetchList, option = {}) => {
  const { target, bottomHeight } = option;
  const resultTargetDom = target || document;
  const footerHeight = bottomHeight || 403;
  const scrollTop = resultTargetDom.scrollTop
    || resultTargetDom.documentElement.scrollTop
    || resultTargetDom.body.scrollTop;
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
