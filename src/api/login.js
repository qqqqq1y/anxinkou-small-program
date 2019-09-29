import $http from '../utils/http';

export default class LoginService {
  static login (params) {
    return $http.post('/login', params);
  }

  static bankList () {
    return $http.get('/contract/bankList');
  }
}
