export const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$/;
export const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
// eslint-disable-next-line max-len
export const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;