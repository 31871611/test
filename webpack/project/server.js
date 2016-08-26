var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.dev.config.js');
var path = require('path');

for (var key in config.entry) {
    var entry = config.entry[key];
    entry.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server');
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    //hot: true,
    stats: {
        colors: true,
        chunks: false
    }
});

server.listen(8080, 'localhost', function() {});