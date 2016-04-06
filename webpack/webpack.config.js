module.exports={
    entry:"./entry.js",         //entry：指定打包的入口文件，每有一个键值对，就是一个入口文件
    output:{                    //output：配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称
        path:__dirname,
        filename:"bundle.js"
    },
    module:{                    //module：定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。
        loaders:[
            {test: /\.vue$/, loader: 'vue-loader'},
            {test:/\.css$/,loader:"style!css"},
            {test:/\.(png|jpg)$/,loader:"url?limit=4000"}       //limit参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        ]
    },
    plugins:[           //插件的使用一般是在 webpack 的配置信息 plugins 选项中指定
        //BannerPlugin 内置插件来实践插件的配置和运行，这个插件的作用是给输出的文件头部添加注释信息
        //new webpack.BannerPlugin('This file is created by mutouren')
    ],
    resolve:{
        alias:{
            jquery:"../public/js/jquery-1.8.3.min.js"
        }
    }
};



// webpack.config.js
// var webpack = require('webpack'), CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
// module.exports = { entry: './app.js', output: { path: './build', filename: 'bundle.js' }, plugins: [ new CommonsChunkPlugin('vendor.js') ] } 多入口文件


//http://www.cnblogs.com/Kummy/p/4966937.html
//http://chenzhutian.org/blog/2016/%E6%B5%85%E8%B0%88VisMooc%E7%9A%84%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/#0-tsina-1-36853-397232819ff9a47a7b7e80a40613cfe1
//http://jiongks.name/blog/just-vue/