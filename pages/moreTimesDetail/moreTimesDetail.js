const $http = require('../../utils/http');

import Dialog from '../../npmComponent/dist/dialog/dialog';
import Toast from '../../npmComponent/dist/toast/toast';

Page({
  data: {
    noValueList: [],
    form: {}
  },

  handleBlur(e) {
    if (!e.detail.value) {
      this.data.noValueList.push(e.target.dataset.typestr);
    } else {
      const str = `form.${e.target.dataset.type}`;

      this.setData({
        [str]: e.detail.value
      })
    }
  },

  handleDeduct() {
    if (this.data.noValueList.length > 0) {
      Toast({
        type: 'fail',
        position: 'middle',
        message: this.data.noValueList[0],
        duration: 2000
      })

      return false;
    }

    const params = {
      ...this.data.form,
      monthTime: `${this.data.form.mouth}/${this.data.form.day}`
    }

    $http.post('http://test.weiqiangtech.com/contract/instalment/deducted/' + this.data.id, params).then(res => {
      if (res.code == 1000) {
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

  onLoad (options) {
    this.setData({
      id: options.id,
      customId: options.customId,
      customName: options.customName
    })
  }
})