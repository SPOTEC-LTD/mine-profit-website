import loadingPlugin from './loadingPlugin';
import sign from '../modules/sign';
import home from '../modules/home';
import publicData from '../modules/public';

export const strict = false;
export const plugins = [loadingPlugin()];

export const state = () => ({ });

export const mutations = { };

export const actions = { };

export const modules = {
  home,
  sign,
  publicData,
};
