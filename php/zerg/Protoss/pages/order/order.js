import { Order } from 'order-model.js';
import { Cart } from '../cart/cart-model.js';
import { Address } from '../../utils/address.js';

var order = new Order();
var cart = new Cart();
var address = new Address();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // productsArr:[],
    fromCartFlag: true,
    addressInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var flag = options.from == 'cart';
    this.data.fromCartFlag = flag;
    this.data.account = options.account;

    // 来自于购物车
    if(flag){
      // 获取购物车选中的商品
      var productArr = cart.getCartDataFromLocal(true);

      this.setData({
        productArr: productArr,
        account: options.account,
        orderStatus: 0
      })

      /*显示收获地址*/
      // address.getAddress((res) => {
      //   this._bindAddressInfo(res);
      // });
    }else{
      //旧订单
      this.data.id = options.id;
    }
  },

  /*绑定地址信息*/
  _bindAddressInfo: function (addressInfo) {
    this.setData({
      addressInfo: addressInfo
    });
  },

  /*修改或者添加地址信息*/
  editAddress:function(){
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: address.setAddressInfo(res)
        };
        that._bindAddressInfo(addressInfo);

        //保存地址
        address.submitAddress(res, (flag) => {
          console.log(res,flag)
          if (!flag) {
            that.showTips('操作提示', '地址信息更新失败！');
          }
        });
      }
    })
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