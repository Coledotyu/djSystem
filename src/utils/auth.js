import Cookie from 'js-cookie';

export const setToken = (data) => Cookie.set('token', data);
export const getToken = () => Cookie.get('token');
export const removeToken = () => Cookie.remove('token');

