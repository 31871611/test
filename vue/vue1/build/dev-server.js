var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// mock数据
var Mock = require('mockjs');
// 读取json文件数据
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// 定义一个路由
var apiRouter = express.Router();
apiRouter.get('/seller',function(req,res){
  res.json({
    error: 0,    //正常后端流程中本值根据业务定义
    data:seller
  });
});
apiRouter.get('/goods',function(req,res){
  res.json({
    error: 0,    //正常后端流程中本值根据业务定义
    data:goods
  });
});
apiRouter.get('/ratings',function(req,res){
  res.json({
    error: 0,    //正常后端流程中本值根据业务定义
    data:ratings
  });
});
apiRouter.get('/mock',function(req,res){
  res.json({
    error: 0,    //正常后端流程中本值根据业务定义
    data:Mock.mock({
      "msg":"成功",
      "Data|10":[{
        "orderNum|1-10000":1,
        "type|1":["正在审核","待送件","正在评估","待定价","待退件","退件中","完成送件","送件失败"],
        "url":"sendinfo.html",
        "images":"images/order_list.jpg",
        "title|1":[
          "A859 郭懋介残荷听雨系列套件章",
          "BV103061 林文举作水洞高山石禅字之祖薄意方章",
          "BV103062 古月作高山石笛弄晚风薄意方章",
          "BV103063 荔枝洞石薄意方章",
          "BV103064 芙蓉石三脚兽钮章",
          "BV103065 王龙龙作芙蓉石马钮章",
          "BV103068 芙蓉石合欢方章",
          "BV103083 都成坑石/高山石金鱼套件",
          "BV103084 芙蓉石夔凤博古纹龙形水盂",
          "BV103085 林云曦作汶洋石饲鹤图臂搁",
          "BV103086 芙蓉石古兽把玩件",
          "BV103087 山秀园石衔芝吉羊把玩件",
          "BV103088 郑则金作芙蓉石灵兔献寿把件"
        ],
        "size":"4.2x3.4x2.6 cm",
        "weight|1-10000":1,
        "price|1-10000":1,
        "time":new Date()
      }]
    })
  });
});
app.use('/api',apiRouter);
// mock数据.end


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
