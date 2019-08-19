const $http = require('../../utils/http');

import Toast from '../../npmComponent/dist/toast/toast';

// canvas 全局配置
var context = null;
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//注册页面
Page({
  data: {
    src: "",
    rpx: ''
  },
  onLoad(options) {
    this.setData({
      Id: options.Id,
      customId: options.customId,
      contractImage: options.contractImage
    })

    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');

    context.draw();
  },
  canvasStart(event) { // 开始画图
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  canvasMove(event) { // 绘图过程
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd(event) { // 绘制结束
    isButtonDown = false;
  },
  // 签订合同
  clickMe() {
    const that = this;

    wx.showLoading({
      title: '正在上传...',
    })

    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      fileType: 'png',
      success(res) {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            that.setData({
              base64Img: res.data
            })

            const params = {
              customId: parseInt(that.data.customId),
              progress: 1,
            };

            $http.post('http://test.weiqiangtech.com/contract/sign/' + that.data.Id, params).then(res => {
              if (res.code == 1000) {
                that.againSign();
              }
            })
          }
        })
      }
    })
  },

  againSign() {
    const params = {
      customId: parseInt(this.data.customId),
      progress: 2,
      contractImage: this.data.base64Img
    };

    $http.post('http://test.weiqiangtech.com/contract/sign/' + this.data.Id, params).then(res => {
      if (res.code == 1000) {
        this.setData({
          contractImg: res.result.contractImage // 最终合同图片
        })

        this.SignContract();
      } else {
        wx.hideLoading();
      }
    })
  },

  SignContract() { // 签约富有
    $http.get('http://test.weiqiangtech.com/contract/signFuiou/' + this.data.Id, {}).then(res => {
      if (res.code == 2004) {
        Toast({
          type: 'success',
          position: 'middle',
          message: `合同已签约`,
          duration: 2000
        })

        wx.switchTab({
          url: '/pages/contract/contract'
        })
      }

      console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    })
  },
  
  cleardraw: function () { // 清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.draw(false);
  },
  canvasIdErrorCallback(e) { // 绘画错误信息
    console.error(e.detail.errMsg)
  },
})