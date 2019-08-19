
function get(url, data) {
  return apiRequest(url, data, "GET")
}

function post(url, data) {
  return apiRequest(url, data, "POST")
}

function apiRequest(url, data = {}, methods = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: methods,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.data.code == 1003) {
          wx.removeStorageSync('token');

          wx.navigateTo({
            url: '/pages/login/login'
          });
        }

        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
};

module.exports = {
  get,
  post
}
