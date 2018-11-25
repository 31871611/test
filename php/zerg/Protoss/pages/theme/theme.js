import { Theme } from 'theme-model.js';
var theme = new Theme(); //实例化  主题列表对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    this.data.titleName = options.name;
    this.data.id = options.id;
    wx.setNavigationBarTitle({
      title: options.name
    });
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.titleName
    });
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    /*获取单品列表信息*/
    theme.getProductorData(this.data.id, (data) => {
      that.setData({
        themeInfo: data,
        loadingHidden: true
      });
      callback && callback();
    });
  },

  /*跳转到商品详情*/
  onProductsItemTap: function (event) {
    var id = theme.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  //分享效果
  onShareAppMessage: function () {
    return {
      title: '零食商贩 Pretty Vendor',
      path: 'pages/theme/theme?id=' + this.data.id
    }
  }
})