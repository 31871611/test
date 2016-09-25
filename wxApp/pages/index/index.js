//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    array:[{msg:'1'},{msg:'2'}]
  },
  //事件处理函数
  bindViewTap: function() {
    /*
wx.navigateTo(OBJECT)：保留当前页面，跳转到应用内的某个页面，

wx.redirectTo(OBJECT)：关闭当前页面，跳转到应用内的某个页面。

wx.navigateBack()：关闭当前页面，回退前一页面。

    */
    //页面跳转
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewData:function(){
    wx.navigateTo({
      url:'../data/data'
    })
  },
  onMenuShartTimeline:function(){
    return{
      title:'首页'
    }
  },
  //页面初始化options为页面跳转所带来的参数
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  },
  //页面显示
  onShow:function(){
    console.log('onShow');
  },
  //页面渲染完成
  onReady:function(){
    console.log('onReady');
  },
  //页面隐藏
  onHide:function(){
    console.log('onHide');
  },
  //页面关闭
  onUnload:function(){
    console.log('onUnload');
  }
})
