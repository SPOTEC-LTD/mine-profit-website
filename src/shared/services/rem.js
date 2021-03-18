const rootValue = 25;
let baseSize = rootValue;
const rootEl = document.documentElement;

// adjust body font size
function setBodyFontSize() {
  if (document.body) {
    document.body.style.fontSize = '12px';
  } else {
    document.addEventListener('DOMContentLoaded', setBodyFontSize);
  }
}

const setFontSize = finalySize => {
  rootEl.style.fontSize = `${Math.round(finalySize)}px`;
};

const setRemUnit = () => {
  const width = rootEl.clientWidth;

  baseSize = width / 15;

  setFontSize(baseSize);
  return baseSize;
};

export const remInit = () => {
  setBodyFontSize();
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      setRemUnit();
    }
  });
};

export const px2rem = size => `${size / baseSize}rem`;
