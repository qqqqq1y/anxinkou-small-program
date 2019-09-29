import $http from '../utils/http';

export default class InfoService {
  static upLoad (params) {
    return $http.post('/uuuuu/cutUpload', params);
  }

  static cordInfo (params) {
    return $http.post('/custom/ocrCard', params);
  }

  static getCustomId (params) {
    return $http.post('/custom/save', params);
  }

  static createContract (params) {
    return $http.post('/contract/save', params);
  }

  // 获取扣款次数
  static getTimes (url) {
    return $http.get(url, {});
  }

  // 单词扣款
  static deducted (url, params) {
    return $http.post(url, params);
  }

  // 分期扣款
  static moreDeducted (url, params) {
    return $http.post(url, params);
  }

  // 签名
  static uploadSign (url, params) {
    return $http.post(url, params);
  }

  // 签约 获取iframe
  static getIframe (url) {
    return $http.get(url, {});
  }

  // 授权 获取iframe
  static getAuthIframe (url) {
    return $http.get(url, {});
  }

  // 查询 签约,授权结果
  static getResult (url) {
    return $http.get(url, {});
  }
}
