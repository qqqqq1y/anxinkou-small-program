const $http = require('../../utils/http');
const api = require('../../utils/api');

import Dialog from '../../npmComponent/dist/dialog/dialog';


Page({
  data: {
    active: 0,


    search: {
      start: 1, // 分页页码
      offset: 20, // 每页条数
      keyword: '', // 搜索关键字
      contractStatus: 0, // 合同状态
    },

    noOverList: [], // 未完成订单
    doingList: [], // 进行中订单
    overList: [], // 已完成订单
    total: 0, // 后台存储的订单长度

    show: false,
    contractUrl: ''
  },

  handleChangeTabs(e) {
    this.setData({
      'search.contractStatus': e.detail.index,
      'search.start': 1,
      total: 0
    });

    this.getContractList();
  },

  // 查看合同
  handleReview(e) {
    this.setData({
      show: true,
      contractUrl: e.currentTarget.dataset.img
    });
  },

  handleCloseImg() {
    this.setData({
      show: false,
      contractUrl: ''
    });
  },

  // 放弃代扣
  handleCancelDeducted(e) {
    console.log(e)

    Dialog.confirm({
      title: '提示',
      message: '是否确定放弃代扣'
    }).then(() => {
      const params = {
        customId: e.currentTarget.dataset.customid
      }

      $http.post('http://test.weiqiangtech.com/contract/cancelDeducted/' + e.currentTarget.dataset.id, params).then(res => {
        if (res.code == 1000) {
          wx.showToast({
            title: '放弃代扣成功',
            icon: 'success',
            duration: 2000
          });

          this.setData({
            'search.start': 1,
            noOverList: [],
            total: 0
          });

          this.getContractList();
        }
      })
    })
    .catch(() => {})
  },

  // 删除合同
  handleDeleteContract(e) {
    Dialog.confirm({
      title: '提示',
      message: '是否确定删除合同'
    }).then(() => {
      $http.get('http://test.weiqiangtech.com/contract/delete/' + e.currentTarget.dataset.id, {}).then(res => {
        if (res.code == 1000) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          });

          this.setData({
            'search.start': 1,
            noOverList: [],
            total: 0
          });

          this.getContractList();
        }
      })
    })
    .catch(() => {})
  },

  // 继续未完成合同
  handleInfo(e) {
    const info = e.currentTarget.dataset.info;

    if (info.progress == 0) { // progress == 0 信息录入完毕,  未签名
      // wx.navigateTo({
      //   url: '../contranceImg/contranceImg?customId=' + info.customId + '&progress=' + JSON.parse(info.progress + 1) + '&contractImage=' + info.contractImage + '&Id=' + info.contractId
      // })

      wx.navigateTo({
        url: '../coverSignature/coverSignature?customId=' + info.customId + '&contractImage=' + info.contractImage + '&Id=' + info.contractId
      })
    } else if (info.progress == 1 && info.progress == 2) { // progress == 1 已签名
      // 签约
    }
  },

  handleToDetail(e) {
    const info = e.currentTarget.dataset;

    if (info.type === 1) {
      wx.navigateTo({
        url: '../oneTimesDetail/oneTimesDetail?id=' + info.id + '&customId=' + info.customid + '&customName=' + info.name
      })
    } else {
      wx.navigateTo({
        url: '../moreTimesDetail/moreTimesDetail?id=' + info.id + '&customId=' + info.customid + '&customName=' + info.name
      })
    }
  },

  handleSearch(e) {
    this.setData({
      'search.keyword': e.detail,
      'search.start': 1,
      total: 0,
      noOverList: [],
      doingList: [],
      overList: []
    });

    this.getContractList();
  },

  handleClear() {
    this.setData({
      'search.keyword': '',
      'search.start': 1,
      total: 0,
      noOverList: [],
      doingList: [],
      overList: []
    })

    this.getContractList();
  },

  getContractList(info) {
    wx.showLoading({
      title: '加载中...',
    })

    const params = {
      ...this.data.search
    }

    $http.post(api.contractList, params).then(res => {
      res.result.list.forEach(item => {
        item.createTime = this.turnTime(item.createTime)

        switch (item.deductedStatus) {
          case 0:
            item.deductedStatus = '未代扣';
            break;
          case 1:
            item.deductedStatus = '代扣处理中';
            break;
          case 2:
            item.deductedStatus = '充值失败';
            break;
          case 3:
            item.deductedStatus = '拨款失败';
            break;
          case 4:
            item.deductedStatus = '拨款成功';
            break;
          case 5:
            item.deductedStatus = '放弃代扣';
            break;
        }
      })

      this.setData({
        total: res.result.count
      })

      if (res.code == 1000) {
        switch(this.data.search.contractStatus) {
          case 0:
            this.setData({ noOverList: this.data.noOverList.concat(res.result.list) });
            break;
          case 1:
            this.setData({ doingList: this.data.doingList.concat(res.result.list) });
            break;
          case 2:
            this.setData({ overList: this.data.overList.concat(res.result.list) });
            break;
        }

        if (info && info === 'Refresh') {
          wx.stopPullDownRefresh();
        }

        wx.hideLoading();
      }
    })
  },

  turnTime(t) {
    const d = new Date(t);
    const date = (d.getFullYear()) + "-" + 
              ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : `0${d.getMonth() + 1}`) + "-" +
              (d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`) + " " + 
              (d.getHours()) + ":" + 
              (d.getMinutes()) + ":" + 
              (d.getSeconds());

    return date;
  },

  onReachBottom() {
    if (this.data.total > this.data.search.start * 20) {
      this.setData({
        'search.start': this.data.search.start + 1
      });

      this.getContractList();
    }
  },

  onPullDownRefresh() {
    this.setData({
      'search.keyword': '',
      'search.start': 1,
      total: 0,
      noOverList: [],
      doingList: [],
      overList: []
    })

    this.getContractList('Refresh');
  },

  onLoad() {
    this.getContractList();
  }
})