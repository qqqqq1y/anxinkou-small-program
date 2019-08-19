Page({
  data: {
    
  },
  
  handleToEntryInformation() {
    wx.navigateTo({
      url: '../entryInformation/entryInformation?contractType=' + 1
    })
  },

  handleToTimesInformation() {
    wx.navigateTo({
      url: '../timesInformation/timesInformation?contractType=' + 2
    })
  },

  handleToLimit() {
    wx.navigateTo({
      url: '../limit/limit'
    })
  },

  onLoad() {
    
  },
})