/* eslint-disable */
var getClientHash = function (u) {
  return {
    "Safari": u.indexOf("Safari") > -1,
    "Chrome": u.indexOf("Chrome") > -1 || u.indexOf("CriOS") > -1,
    "IE": u.indexOf("MSIE") > -1 || u.indexOf("Trident") > -1,
    "Edge": u.indexOf("Edge") > -1,
    "Firefox": u.indexOf("Firefox") > -1 || u.indexOf("FxiOS") > -1,
  }
};

var getBrowserVersionHash = function (u) {
  return {
    "Safari": function Safari() {
      return u.replace(/^.*Version\/([\d.]+).*$/, "$1")
    }, "Chrome": function Chrome() {
      return u.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1")
    }, "IE": function IE() {
      return u.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1")
    }, "Edge": function Edge() {
      return u.replace(/^.*Edge\/([\d.]+).*$/, "$1")
    }, "Firefox": function Firefox() {
      return u.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1")
    }, "Firefox Focus": function FirefoxFocus() {
      return u.replace(/^.*Focus\/([\d.]+).*$/, "$1")
    }, "Chromium": function Chromium() {
      return u.replace(/^.*Chromium\/([\d.]+).*$/, "$1")
    }
  }
};

var browsers = ["Safari", "Chrome", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera"];
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
var clientHash = getClientHash(userAgent);
var browserVersionHash = getBrowserVersionHash(userAgent);

var info = {};
for (var i = 0; i < browsers.length; i++) {
  var value = browsers[i];
  if (clientHash[value]) {
    info.browser = value
  }
}

var getBrowserVersion = function () {
  if (browserVersionHash[info.browser]) {
    return browserVersionHash[info.browser]() || ""
  }
  return ""
};

info.version = getBrowserVersion();

window.__browserInfo = info;

var availableBrowserList = ['Safari', 'Chrome', 'Edge', 'Firefox', 'Chromium', "IE"];
var browserInfo = window.__browserInfo;

var isAvailableBrowser = availableBrowserList.indexOf(browserInfo.browser) >= 0;
var isIE = browserInfo.browser === "IE";
if (!isAvailableBrowser || (isIE && info.version.indexOf('11') < 0)) {
  location.href = "/upgrade.html";
}
