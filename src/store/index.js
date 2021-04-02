import loading from '@/shared/utils/loading';
import home from '../modules/home';
import publicData from '../modules/public';

export const strict = false;
export const plugins = [loading()];

export const state = () => ({ });

export const mutations = { };

export const actions = { };

export const modules = {
  home,
  publicData,
};
