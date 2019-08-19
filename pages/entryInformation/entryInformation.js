const $http = require('../../utils/http');
const api = require('../../utils/api');
const app = getApp();

import Toast from '../../npmComponent/dist/toast/toast';

Page({
  data: {
    showSheet: false,
    actions: [
      {
        name: '从相册选取',
        val: 1
      },
      {
        name: '拍摄照片',
        val: 2
      },
    ],
    loading: false,
    cordType: '',
    hasIdCard: false,
    idCardUrl: '',
    form: [{

    }],
    showPicker: false,
    bankList: [],
    // 表单内容
    formInfo: {
      info_name: '',
      info_idCard: '',
      info_bankCard: '',
      info_bankName: '',
      info_bankPhone: '',
      info_money: '',
      info_point: '',
    },
    idCardFront: '', // 上传返回的 身份证url
    bankCardFront: '', // 上传返回的 银行卡url

    // 弹出框
    showDialog: false
  },

  handleNext() {
    let noVal = [];

    Object.keys(this.data.formInfo).forEach(key => {
      if (!this.data.formInfo[key]) {
        noVal.push(key)
      }
    })

    if (noVal.length === 0) {
      this.setData({
        showDialog: true
      })
    } else {
      const val = this.filterList(noVal[0]);

      Toast({
        type: 'fail',
        position: 'top',
        message: `请输入${val}`,
        duration: 2000
      })
    }
  },

  handleCloseDialog() {
    this.setData({
      showDialog: false
    })
  },

  handleInputValue(e) {
    const type = `formInfo.${e.currentTarget.dataset.type}`

    this.setData({
      [type]: e.detail
    })
  },

  uploadCord(val) {
    let source = val === 1 ? ['album'] : ['camera'];

    wx.chooseImage({
      count: 1,
      sourceType: source,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths[0];

        if (tempFilePaths) {
          if (this.data.cordType === 'idCord') {
            this.setData({
              hasIdCard: true,
              idCardUrl: tempFilePaths
            })

            wx.uploadFile({
              url: 'http://test.weiqiangtech.com/uuuuu/cutUpload',
              filePath: tempFilePaths,
              name: 'avatar_file',
              header: {
                'enctype': "multipart/form-data",
                'token': wx.getStorageSync('token')
              },
              formData: {
                'avatar_data': '{"x": 0, "y": 0, "width": 1000, "height": 1000}'
              },
              success: (data) => {
                this.setData({
                  idCardFront: JSON.parse(data.data).result
                });

                this.identifyImg();
                wx.hideLoading();
              }
            })
          }

          if (this.data.cordType === 'bankCord') {
            this.setData({
              hasBankCord: true,
              bankCordUrl: tempFilePaths
            })

            wx.uploadFile({
              url: 'http://test.weiqiangtech.com/uuuuu/cutUpload',
              filePath: tempFilePaths,
              name: 'avatar_file',
              header: {
                'enctype': "multipart/form-data",
              },
              formData: {
                'avatar_data': '{"x": 0, "y": 0, "width": 1000, "height": 1000}'
              },
              success: (data) => {
                this.setData({
                  bankCardFront: JSON.parse(data.data).result
                })

                this.identifyImg();
                wx.hideLoading();
              }
            })
          }

          
        }
      },
      complete: () => {
        this.setData({
          showSheet: false,
        })
      }
    })
  },

  identifyImg() { // 识别银行卡， 身份证
    if (this.data.idCardFront && this.data.bankCardFront) {
      const params = {
        idCard: '',
        bankcard: ''
      };

      params.bankcard = this.data.bankCardFront;
      params.idCard = this.data.idCardFront;
      // 后台识别信息
      $http.post(api.uploadFile, params).then(res => {
        console.log(res, '图片信息');

        wx.hideLoading();
      })
    }
  },

  hadnleCreateInfo() {
    const info = this.data.formInfo;

    const customParams = {
      customName: info.info_name,
      idCard: info.info_idCard,
      // idCardFront: 'http://testimage.weiqiangtech.com/upload/user/image_test/20190711185916552.png',
      idCardFront: this.data.idCardFront,
      idCardBack: null
    }

    const params = {
      customId: '',
      bankAccount: info.info_bankCard,
      provinceId: '',
      cityId: '',
      bankBindPhone: info.info_bankPhone,
      // bankCardFront: 'http://testimage.weiqiangtech.com/upload/user/image_test/20190712155555985.png',
      bankCardFront: this.data.bankCardFront,
      bankCardBack: '',
      loanLimit: parseInt(info.info_money),
      progress: 0,
      agencyFees: parseInt(info.info_point),
      contractType: parseInt(this.data.contractType)
    }

    if (this.data.instalmentCount) {
      params.instalmentCount = parseInt(this.data.instalmentCount)
    }


    this.data.bankSearchList.forEach(item => {
      if (item.bankName === this.data.formInfo.info_bankName) {
        params.bankId = item.bankCode
      }
    });

    $http.post(api.customSave, customParams).then(res => {
      if (res.code == 1000) {
        params.customId = res.result.id
      }

      $http.post(api.contractSave, params).then(rs => {
        this.setData({
          contractImage: rs.result.contractImage, // 合同图片地址
          contractPdf: rs.result.contractPdf // 合同图片pdf文件地址
        })

        wx.navigateTo({
          url: '../contranceImg/contranceImg?progress=' + 1 + '&contractImage=' + this.data.contractImage + '&customId=' + res.result.id + '&Id=' + rs.result.id
        })
      })
    })
  },

  handSelectSheet(e) {
    wx.showLoading({
      title: '正在上传...',
    })

    const choose = e.detail.val;

    this.uploadCord(choose)
  },

  handleOpenSheet(e) {
    this.setData({
      showSheet: true,
      cordType: e.currentTarget.dataset.type
    })
  },

  handleCloseSheet() {
    this.setData({
      showSheet: false
    })
  },

  handleShowBankList() {
    this.setData({
      showPicker: true
    })
  },

  onConfirm(e) {
    this.setData({
      showPicker: false,
      'formInfo.info_bankName': e.detail.value
    })
  },

  onCancel() {
    this.setData({
      showPicker: false
    })
  },

  getBankList() {
    $http.get(api.bankList, {}).then(res => {
      const bankList = [];
      const bankSearchList = [];

      res.result.forEach(item => {
        bankList.push(item.bankName);
        bankSearchList.push({ bankName: item.bankName, bankCode: item.id })
      })

      this.setData({
        bankList,
        bankSearchList
      })
    })
  },

  filterList(v) {
    const list = [
      { lab: 'info_name', val: '姓名' },
      { lab: 'info_idCard', val: '身份证号' },
      { lab: 'info_bankCard', val: '银行卡号' },
      { lab: 'info_bankName', val: '开户行' },
      { lab: 'info_bankPhone', val: '银行预留电话' },
      { lab: 'info_money', val: '贷款额度' },
      { lab: 'info_point', val: '服务费比例' },
    ];

    let a;

    list.forEach(item => {
      if (item.lab === v) {
        a = item.val
      }
    });

    return a;
  },

  onLoad(options) {
    this.setData({
      contractType: options.contractType,
      instalmentCount: options.instalmentCount || null
    })

    this.getBankList();
  }
})