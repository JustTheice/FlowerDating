import axios from 'axios';
import {BASE_URI} from './pathMap';

import RootStore from '../mobx';
import Toast from '../components/UIUtils/Toast';

const loginRequester = axios.create({
  baseURL: BASE_URI
})
// 添加请求拦截器
loginRequester.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.showCustom('请求中');
  return config;
}, function (error) {
  Toast.hideCustom();
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
loginRequester.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.hideCustom();
  return response.data;
}, function (error) {
  Toast.hideCustom();
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 *  私有请求器，用来请求用户信息类数据
 */
console.log('请求器---',RootStore.token)
const privateRequester = axios.create({
  baseURL: BASE_URI
})
//请求拦截器
privateRequester.interceptors.request.use(function (config) {
  config.headers = {
    ...config.headers,
    "Authorization": `Bearer ${RootStore.token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
privateRequester.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export {loginRequester, privateRequester}