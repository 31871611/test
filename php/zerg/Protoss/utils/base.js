import { Config } from '../utils/config.js';
import { Token} from '../utils/token.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

  // 当noRefetch为true时，不做未授权重试机制
  request(params,noRefetch){
    var that = this;
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
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);

        if (startChar == '2'){
          params.sCallback && params.sCallback(res.data);
        }else{
          if(code == '401'){
            if (!noRefetch){
              that._refetch(params);
            }
          }
          if (noRefetch){
            params.eCallback && params.eCallback(res.data);
          }
        }
      },
      fail: function (res) {
        params.error && params.error(res);
      },
      complete: function (res) { },
    })
  }

  _refetch(params){
    var token = new Token();
    token.getTokenFromServer(token=>{
      this.request(params,true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

}

export {Base};