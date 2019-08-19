const $http = require('../../utils/http');
const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    username: '',
    password: '',
    isChecked: 'yes',
    hasLogin: false,
    navHeight: app.globalData.statusBarHeight
  },

  handleUsername(e) {
    this.setData({
      username: e.detail,
      hasLogin: false
    })
  },

  handlePassword(e) {
    this.setData({
      password: e.detail,
      hasLogin: false
    })
  },

  handleChangeRadio() {
     this.setData({
       isChecked: this.data.isChecked === 'yes' ? 'no' : 'yes'
     });
  },

  handleLogin() {
    if (this.data.hasLogin) {
      return false;
    }

    this.setData({
      hasLogin: true
    });

    const params = {
      jobCode: this.data.username,
      pass: this.data.password
    }

    $http.post(api.login, params).then(res => {
      if (res.code == 1000) {
        wx.setStorageSync('token', res.result.token);
        app.globalData.account = res.result;

        if (this.data.isChecked === 'yes') {
          wx.setStorageSync('username', this.data.username);
        } else {
          wx.removeStorageSync('username');
        }

        this.setData({
          hasLogin: false
        });

        wx.switchTab({
          url: '/pages/entrance/entrance'
        })
      }
    })
  },

  handleForgetPass() {
    console.log('忘记密码')
  },

  onLoad() {
    const username = wx.getStorageSync('username');

    if (username) {
      this.setData({
        username
      })
    }
  }
})