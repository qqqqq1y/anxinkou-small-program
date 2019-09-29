import $http from '../utils/http';

export default class ContractService {
  static getContractList (params) {
    return $http.post('/contract/list', params);
  }

  static deleteContract (url) {
    return $http.get(url);
  }

  static cancelDeducted (url, params) {
    return $http.post(url, params);
  }
}
