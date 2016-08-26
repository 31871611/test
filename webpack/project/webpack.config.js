/*
 http://www.jianshu.com/p/bb48898eded5


 entry
 入口文件，也就是一切工作的起点，你可以将整个web应用都最终打包成一个js文件，那你只需要定义一个入口，
 而如果你希望对多个页面独立开来，你需要定义多个入口，最终在不同的页面引用不同的js。
 一个entry对应生成一个bundle。


 output
 定义打包输出的配置：
 path是打包文件的存放路径，按上面的配置，意味着我们待会打包的文件是要放在dist/static下的；
 publicPath是定义文件被打包后的url前缀的，效果是<script src="index.js"></script> => <script src="static/index.js"></script>；
 filename顾名思义，就是定义打包后的名字，你可以按照上面的方式定义，
 最终文件名与原来的保持一致，也可以在这个基础上自己再拼接一些名词，
 比如[name].min.js，最终打包出来文件名就是index.min.js。


 resolve
 这个配置可有可无，它是定义一些常用的文件拓展名，被定义了的文件格式，在引用的时候可以不加扩展名，
 比如我配置了.js的拓展名之后，在开发中我可以直接require('./common')，而不需要require('./common.js')。


 module
 最重要的一个部分，我们在这里定义针对各种类型文件的loader（加载器/编译器），
 可以看到我们分别定义了css、scss、swig三种文件对应的loader，多个loader之间用!隔开，'-loader'可以省略不写。
 注意，编译的优先次序是从右到左的，比如scss文件是先被sass-loader处理，然后再被css-loader处理，最后再被style-loader处理。


 plugins
 一般来说webpack就只是处理入口文件，也就是从js去入手，这样的话怎么都轮不到html，那怎么样才能让webpack去处理一下html？
 答案就是我们之前提过的，plugins！

 webpack允许以插件的方式去扩展功能。
 html-webpack-plugin是webpack提供的一个简化html处理的插件，
 其实本意就是为了解决这个引用bundle的问题，
 顺便提供一些像压缩啊注入、变量啊什么的功能。
 具体其他功能大家可以去官网看文档。
 npm install html-webpack-plugin --save-dev

 外联css
 npm install extract-text-webpack-plugin --save-dev


 开发环境
 npm install --save-dev webpack-dev-server
 webpack-dev-server有两种使用方式，cli和api

 cli的方式要求我们全局安装webpack-dev-server
 npm install webpack-dev-server -g
 webpack-dev-server --config ./webpack.dev.config.js --display-error-details --devtool eval --content-base ./ --inline --progress --colors --host 0.0.0.0
 1.content-base 设置开发服务器的根目录；
 2.host 设置为0.0.0.0使我们在局域网中可以通过ip的方式访问；
 3.hot 配置热更新。

 api
 api会更灵活一些
 使用api的方式，意味着我们需要自己来手动定义一个开发服务器，并且补充相关配置项


 */


var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');                 //把js、css引入到index.html
var ExtractTextPlugin = require('extract-text-webpack-plugin');         //生成link:css

module.exports = {
    entry: {
        Index: ['./src/js/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist/static'),
        publicPath: 'static/',
        filename: '[name].[chunkhash].js'       //chunkhash生成md5编码
    },
    resolve: {
        extensions: ['', '.js', '.scss', '.swig']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                //loader: 'style!css'
                loader: ExtractTextPlugin.extract('style', ['css'])         //生成link:css
            },
            {
                test: /\.scss$/,
                //loader: 'style!css!sass'
                loader: ExtractTextPlugin.extract('style', ['css', 'sass'])     //生成link:css
            },
            {
                test: /\.swig$/,
                loader: 'swig'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new HtmlWebpackPlugin({
            chunks: ['Index'],
            filename: '../index.html',      // 留意这里，这里的路径是相对来path配置的
            template: './src/tpl/index',
            inject: true
        })

    ]
};