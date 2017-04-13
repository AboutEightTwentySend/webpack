var webpackConfig = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./config")

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    contentBase: config.utils_paths.src(""),//获取资源的路径
    publicPath: config.publicPath,//引入打包完成的js等路径到html中
    hot: true,
    inline:true,
    stats: {
        chunks: false,
        chunkModules: false,
        colors: 1
    }
});
console.log(`App is run in url http://${config.server_host}:${config.server_port}`);
server.listen(config.server_port);
