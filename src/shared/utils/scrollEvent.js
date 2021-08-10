const scrollEvent = (fetchList, option = {}) => {
  const { target, bottomHeight } = option;
  const footerHeight = bottomHeight || 403;
  const scrollTop = target.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = target.clientHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const scrollHeight = target.scrollHeight || document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollHeight - scrollTop - windowHeight <= footerHeight) {
    fetchList();
  }
};

export default scrollEvent;
