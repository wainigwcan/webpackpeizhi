const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/app/index.js', './src/index.html'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index.js'
    },
    mode: 'development', //配置工作模式  开发环境
    module: {
        rules: [
            // sass样式
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            // 语法检查
            {
                test: /\.js$/, //只检测js文件
                exclude: /node_modules/, //排除node_modules文件夹
                enforce: "pre", //提前加载使用
                use: { //使用eslint-loader 解析
                    loader: 'eslint-loader'
                },
            },
            // 转换es6语法
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            useBuiltIns: 'usage',
                            corejs: { version: 3 },
                            targets: {
                                "chrome": "78",
                                "ie": "9"
                            }
                        }]
                        ],
                        cacheDirectory: true
                    }
                }
            },
            // file-loader其他loader 字体 视频 音频等
            {
                test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
                loader: "file-loader",
                options: {
                    outputPath: "media",
                    name: '[hash:4].[ext]'
                }
            },
            // 样式中图片
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[hash:5].[ext]',
                            publicPath: '/images/',
                            outputPath: 'images'
                        }
                    }

                ]
            },
            // 配置img标签loader
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    // 配置自动化编译
    devServer: {
        open: true, //自动打开浏览器
        compress: true, //启动gzip压缩
        port: 3000,
        hot: true // 启动热替换
    }
};