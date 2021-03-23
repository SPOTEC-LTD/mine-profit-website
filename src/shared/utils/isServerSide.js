const isServerSide = () => typeof XMLHttpRequest === 'undefined';

export default isServerSide;