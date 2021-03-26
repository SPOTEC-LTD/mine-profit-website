const scrollEvent = fetchList => {
  const footerHeight = 403;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollHeight - scrollTop - windowHeight <= footerHeight) {
    fetchList();
  }
};

export default scrollEvent;
