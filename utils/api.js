const baseUrl = 'http://test.weiqiangtech.com';


module.exports = {
  login: baseUrl + '/login',

  // 合同列表
  contractList: baseUrl + '/contract/list',

  // 银行列表
  bankList: baseUrl + '/contract/bankList',

  // 上传身份证, 银行卡
  uploadFile: baseUrl + '/custom/ocrCard',

  // 新建合同
  contractSave: baseUrl + '/contract/save',

  // 新建客户信息
  customSave: baseUrl + '/custom/save',

  // 签订合同
  sign: baseUrl + '/contract/sign'
}
