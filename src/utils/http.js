import axios from 'axios';
// import Qs from 'qs';

// http://test.weiqiangtech.com/

const instance = axios.create({
  baseURL: 'http://test.weiqiangtech.com/', // 代理baseUrl
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'token': ''
  }
});

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  const token = localStorage.getItem('token');
  config.headers.token = token;

  if (config.url.indexOf('/uuuuu') > -1) {
    config.headers['content-type'] = 'application/x-www-form-urlencoded';
    config.headers.enctype = 'multipart/form-data';
  }


  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // 拦截返回值
  if (response.data.code === '1003') {
    localStorage.removeItem('token');

    window.location.hash = '/web/';
  }

  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default {
  get (url, params) {
    return instance.get(
      url, { params }
    ).then(rs => (rs));
  },
  post (url, data) {
    return instance.post(
      url, data
    ).then(rs => (rs));
  }
};