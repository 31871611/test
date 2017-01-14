

module.exports={
    entry:"./entry.js",         //entry：指定打包的入口文件，每有一个键值对，就是一个入口文件
    output:{                    //output：配置打包结果
        path:__dirname,         //path定义了输出的文件夹
        filename:"bundle.js"    //filename则定义了打包结果文件的名称
    },
    module:{                    //module：定义了对模块的处理逻辑
        loaders:[               //loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。
            {test: /\.vue$/, loader: 'vue-loader'},
            {test:/\.css$/,loader:"style!css"},
            {test:/\.(png|jpg)$/,loader:"url?limit=4000"}       //limit参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        ]
    },
    plugins:[           //插件的使用一般是在 webpack 的配置信息 plugins 选项中指定
        //BannerPlugin 内置插件来实践插件的配置和运行，这个插件的作用是给输出的文件头部添加注释信息
        //new webpack.BannerPlugin('This file is created by mutouren')
    ],
    resolve:{       //别名
        alias:{
            jquery:"../public/js/jquery-1.8.3.min.js"
        }
    }
};


/*
module.exports = {
    devtool: "source-map",	//生成sourcemap,便于开发调试
    entry: getEntry(),		 //获取项目入口js文件
    output: {
        path: path.join(__dirname, "dist/js/"), //文件输出目录
        publicPath: "dist/js/",		//用于配置文件发布路径，如CDN或本地服务器
        filename: "[name].js",		//根据入口文件输出的对应多个文件名
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [
            // { test: /\.css$/, loader: "style-loader!css-loader"},
            // { test: /\.less$/, loader: "style-loader!csss-loader!less-loader"}
        ]
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            jquery: srcDir + "/js/lib/jquery.min.js",
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui"
        }
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            // nie: "nie"
        }),
        //将公共代码抽离出来合并为一个文件
        new CommonsChunkPlugin('common.js'),
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
*/


//http://www.cnblogs.com/Leo_wl/p/4793722.html
//http://www.cnblogs.com/Kummy/p/4966937.html
//http://chenzhutian.org/blog/2016/%E6%B5%85%E8%B0%88VisMooc%E7%9A%84%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/#0-tsina-1-36853-397232819ff9a47a7b7e80a40613cfe1
//http://jiongks.name/blog/just-vue/



/*

 Webpack解惑
 https://zhuanlan.zhihu.com/p/24744677


 http://www.mmxiaowu.com/article/5825d0b3f13f2541f7d7bd45
 压缩时会把display: -webkit-flex;去除问题

 vuecli里/build/utils.js
 css: generateLoaders(['css']),
 修改为
 css: generateLoaders(['css?-autoprefixer']),
 //css: generateLoaders(['css?-autoprefixer', 'postcss']),

 */