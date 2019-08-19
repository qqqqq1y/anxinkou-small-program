// pages/contranceImg/contranceImg.js
Page({
  data: {
    url: ''
  },

  handleToCoverSign() {
    wx.navigateTo({
      url: '../coverSignature/coverSignature?customId=' + this.data.customId + '&contractImage=' + this.data.url + '&Id=' + this.data.Id
    })
  },

  handleToNext() {

  },

  onLoad(options) {
    this.setData({
      Id: options.Id,
      customId: options.customId,
      progress: options.progress,
      url: options.contractImage
    })
  }
})