var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require("./config")

var webpackConfig = {
    plugins: [
        //压缩js代码
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: config.utils_paths.src('index.html'),
            favicon: config.utils_paths.src('static/favicon.ico'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            // projectPath: `http://${config.server_host}:${config.server_port}/`
        })
    ],
    entry: {
        "main": config.utils_paths.src('main.js'),
        //入口文件的作用是进行页面的初始化，比如一些事件绑定，初始数据加载都是放在这里的。每个页面都可以有一个入口文件
    },
    output: {
        path: config.utils_paths.dist(""),
        filename: '[name].[hash].js',
        publicPath: config.compiler_public_path
    },
    //配置查找模块的路径和扩展名和别名（方便书写）
    // resolve: { root: config.utils_paths.src(""), extensions: ['', '.js', '.jsx', '.json'] },
    devServer: {
        hot: true,
        inline: true,
        port: config.server_port,
    },
    devtool: config.devtool,
    module: {
        loaders: [{
            test: /\.js$/, // 匹配.js文件，如果通过则使用下面的loader
            exclude: /node_modules/, // 排除node_modules文件夹
            loader: 'jsx-loader?harmony' // 使用babel（babel-loader的简写）作为loader
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
}
if (config.dev) {
} else {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

module.exports = webpackConfig
