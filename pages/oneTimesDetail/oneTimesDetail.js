const $http = require('../../utils/http');

import Dialog from '../../npmComponent/dist/dialog/dialog';
import Toast from '../../npmComponent/dist/toast/toast';

Page({
  data: {
    times: 0
  },

  getTimes() {
    $http.get('http://test.weiqiangtech.com//contract/deductedcount/' + this.data.id, {}).then(res => {
      this.setData({
        times: res.result.deductedCount
      })
    })
  },

  handleBlur(e) {
    this.setData({
      money: e.detail.value
    })
  },

  handleDeduct() {
    if (!this.data.money) {
      Toast({
        type: 'fail',
        position: 'middle',
        message: `请输入扣款金额`,
        duration: 2000
      })

      return false;
    }

    const params = {
      customId: parseInt(this.data.customId),
      money: parseInt(this.data.money)
    }

    $http.post('http://test.weiqiangtech.com/contract/deducted/' + this.data.id, params).then(res => {
      if (res.code == 1000 || res.code == 1001) {
        Dialog.alert({
          message: res.msg
        }).then(() => {
          wx.reLaunch({
            url: '/pages/deduction/deduction'
          })
        });
      } else {
        Dialog.alert({
          message: res.msg
        }).then(() => {});
      }
    })
  },

  handleToBack() {
    wx.navigateBack();
  },

  onLoad: function (options) {
    this.setData({
      id: options.id,
      customId: options.customId,
      customName: options.customName
    })

    this.getTimes();
  }
})