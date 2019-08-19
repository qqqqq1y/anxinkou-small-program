const $http = require('../../utils/http');
const api = require('../../utils/api');

Page({
  data: {
    bankList: []
  },

  getBankData(cb) {
    $http.get(api.bankList, {}).then(res => {
      this.setData({
        bankList: res.result
      });

      if (typeof cb == 'function') cb()
    })
  },

  onLoad() {
    this.getBankData();
  },

  onPullDownRefresh () {
    const stop = () => {
      wx.stopPullDownRefresh();
    }

    this.getBankData(stop);
  }
})