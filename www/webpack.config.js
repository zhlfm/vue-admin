/**
 * Created by alone on 17-5-11.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 压缩代码
require("babel-core/register");
require("babel-polyfill");
//const ZipPlugin = require('zip-webpack-plugin');
let webpackConfig = {
    entry: {
        index: ['babel-polyfill','./index.js'],
        vendor: ['vue', 'vue-router', 'jquery', 'axios']
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader"
                }]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: [/node_modules/]
            },
            {
                test: /\.html$/,
                use: [{
                    loader:"vue-html-loader"
                }]
            },
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    use: ["css-loader?minimize","less-loader"]
                })
            },
            {
                test: /\.less$/,
                use:ExtractTextPlugin.extract({
                    use: ["css-loader?minimize","less-loader"]})
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 25000,
                        name: 'images/[name].[hash:7].[ext]'    // 将图片都放入images文件夹下，[hash:7]防缓存
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
                    }
                }]
            }
        ]
    },
    resolve: {
    	alias: {
    		'jquery': 'jquery'
    	}
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
       	new webpack.ProvidePlugin({
          	$: "jquery",
          	jQuery: "jquery"
      	}),
        new webpack.DefinePlugin({
            // 'process.env': {NODE_ENV: '"production"'},
            config: JSON.stringify(require(`../env/${process.env['NODE_ENV'] || 'dev'}`))
        }),
        new HtmlWebpackPlugin({
            // 生成出来的html文件名
            filename: `index.html`,
            // 每个html的模版，这里多个页面使用同一个模版
            template: './index.ejs',
            // 自动将引用插入html
            inject: true,
            // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            chunks: ['index', 'vendor'],
            hash: true
        }),
//		new UglifyJSPlugin() //压缩代码
//      new BabiliPlugin(),
//      new ZipPlugin({
//          path: path.join(__dirname,'../public'),
//          filename: '../admin-mobile.zip'
//      })
    ],

};
module.exports = webpackConfig;