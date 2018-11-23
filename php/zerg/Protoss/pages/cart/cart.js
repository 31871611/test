import { Cart } from 'cart-model.js';

var cart = new Cart(); //实例化 购物车
var x1 = 0;
var x2 = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    selectedCounts: 0,      //总的商品数
    selectedTypeCounts: 0,  //总的商品类型数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartData = cart.getCartDataFromLocal(),         // 获取购物车商品
        countsInfo = cart.getCartTotalCounts(true);     // 获得购物车商品总数目
    this.setData({
      selectedCounts: countsInfo.counts1,
      selectedTypeCounts: countsInfo.counts2,
      account: this._calcTotalAccountAndCounts(cartData).account,
      loadingHidden: true,
      cartData: cartData
    });
  },

  /*
  * 计算总金额和选择的商品总数
  * */
  _calcTotalAccountAndCounts: function (data) {
    var len = data.length,        // 购物车商品数量
              account = 0,        // 所需要计算的总价格，但是要注意排除掉未选中的商品
              selectedCounts = 0, // 购买商品的总个数
              selectedTypeCounts = 0; // 购买商品种类的总数
    let multiple = 100;
    for (let i = 0; i < len; i++) {
      //避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，乘以 100 *100
      if (data[i].selectStatus) {
        account += data[i].counts * multiple * Number(data[i].price) * multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
    }
  },

  /*调整商品数目*/
  changeCounts: function (event) {
    var id = cart.getDataSet(event, 'id'),
        type = cart.getDataSet(event, 'type'),          // 是加或减
        index = this._getProductIndexById(id),          // 查出是第几个商品，获得商品index
        counts = 1;
    if (type == 'add') {
      cart.addCounts(id);
    } else {
      counts = -1;
      cart.cutCounts(id);
    }
    //更新商品页面
    this.data.cartData[index].counts += counts;
    this._resetCartData();
  },

  /*选择商品*/
  toggleSelect: function (event) {
    var id = cart.getDataSet(event, 'id'),
        status = cart.getDataSet(event, 'status'),
        index = this._getProductIndexById(id);            // 查出是第几个商品，获得商品index
    this.data.cartData[index].selectStatus = !status;     // 设为选中或未选中
    this._resetCartData();                                // 重新计算数量价格等
  },

  /*全选*/
  toggleSelectAll: function (event) {
    var status = cart.getDataSet(event, 'status') == 'true';      // 修改全选的显示状态
    var data = this.data.cartData,
        len = data.length;
    for (let i = 0; i < len; i++) {
      data[i].selectStatus = !status;         // 如果全选状态是选中就设为未选中，不然就是设为选中
    }
    this._resetCartData();                    // 重新计算更新数量价格等
  },

  /*根据商品id得到 商品所在下标*/
  _getProductIndexById: function (id) {
    var data = this.data.cartData,
        len = data.length;
    for (let i = 0; i < len; i++) {
      if (data[i].id == id) {
        return i;
      }
    }
  },

  /*更新购物车商品数据*/
  _resetCartData: function () {
    var newData = this._calcTotalAccountAndCounts(this.data.cartData); /*重新计算总金额和商品总数*/
    this.setData({
      account: newData.account,
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      cartData: this.data.cartData
    });
  },

  /*删除商品*/
  delete: function (event) {
    var id = cart.getDataSet(event, 'id'),
        index = this._getProductIndexById(id);
    this.data.cartData.splice(index, 1);  //删除某一项商品

    this._resetCartData();
    //this.toggleSelectAll();

    cart.delete(id);  //内存中删除该商品
  },

  /*提交订单*/
  submitOrder: function () {
    wx.navigateTo({
      url: '../order/order?account=' + this.data.account + '&from=cart'
    });
  },

  /*查看商品详情*/
  onProductsItemTap: function (event) {
    var id = cart.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  /*离开页面时，更新本地缓存*/
  onHide: function () {
    cart.execSetStorageSync(this.data.cartData);
  },

  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})