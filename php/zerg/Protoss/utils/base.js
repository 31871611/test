import { Config } from '../utils/config.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

  request(params,callBack){
    var url = this.baseRequestUrl + params.url
    if (!params.type){
      params.type = 'GET'
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function (res) {
        params.error && params.error(res);
      },
      complete: function (res) { },
    })
  }


}

export {Base};