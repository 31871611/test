var util = require('../../utils/util.js')
Page({
  data:{
    msg:'data页面',
    array:[1,2,3,4,5],
    items:[{
      message:'foo'
    },{
      message:'bar'
    }],
    view:'mina',
    flag:true,
    a:1,
    b:2,
    c:3,
    count:1,
    hidden:false,
    swiper:{
      imgUrls:[
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
    }
  },
  onLoad:function(){
    console.log('data---onLoad');
  },
  onShow:function(){
    console.log('data---onshow');
  },
  onReady:function(){
    this.setData({
      hidden: true
    })
  },
  add:function(event){
      console.log(event);
      this.setData({
          count:this.data.count + 1
      })
  }
})