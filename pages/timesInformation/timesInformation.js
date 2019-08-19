import Toast from '../../npmComponent/dist/toast/toast';


Page({
  data: {
    times: '',
    showDialog: false
  },

  handleInputValue(e) {
    this.setData({
      times: parseInt(e.detail)
    })
  },

  handleShowDialog() {
    if (!this.data.times) {
      Toast('请输入分期扣款次数~');

      return false;
    }

    if (typeof this.data.times !== 'number') {
      Toast('请输入整数~');

      return false;
    }

    this.setData({
      showDialog: true
    })
  },

  handleCloseDialog() {
    this.setData({
      showDialog: false
    })
  },

  hadnleCreateInfo() {
    wx.navigateTo({
      url: '/pages/entryInformation/entryInformation?contractType=' + this.data.contractType + '&instalmentCount=' + this.data.times
    })
  },

  onLoad(options) {
    this.setData({
      contractType: options.contractType
    })
  }
})
