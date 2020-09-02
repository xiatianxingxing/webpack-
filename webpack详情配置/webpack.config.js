/* 
    webpack.config.js webpack配置文件
    作用 ：指令
*/
// resolve用来拼接绝对路径的方法
const { resolve } = require('path')
// 引入HTML文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    // 入口文件
    entry: './src/js/index.js',

    // 输出
    output: {
        // 文件名称指定目录
        filename:"js/[name].js",
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径的前缀 -》 imgs/a.jpg ==> /imgs/a.jpg
        // publicPath: '/',
        // 非入口chunk的名称
        //chunkFilename:'js/[name]_chunk.js',
        // 整个库向外暴露的变量名
        //library: '[name]',
        //libraryTarget: 'window', // 变量添加到 browser

    },
    //loader的配置
    module:{
        rules:[
            {
                test:/\.css/,
                // 多个loader
                use: ['style-loader','css-loader'],
            },
            
        ]
    },
    // 插件配置
    plugins:[
        
       
        new HtmlWebpackPlugin()
        
    ],
    // 模式
    mode: 'development',
    resolve:{
        // 配置解析模块路径别名： 优化简写路径 缺点领没有提示
        alias:{
            '@': resolve('src'),
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名 
        extensions: ['.js','.josn','.css','.jsx'],
        // 告诉webpack解析模块是去那个目录下
        // modules: [resolve(__dirname, '../../node_modules'),'node_modules']
    },
    devServer:{
        // 运行代码目录
        contentBase: resolve(__dirname,'build'),
        // 监视 contentBase目录下的所有文件，一旦文件发生变化就会 reload
        watchContentBase: true,
        // 监视文件
        watchOptions:{
            // 忽略文件（也就是不进行监视）
            ignored: /node_modules/
        },
        // 启动压缩 gzip
        compress: true,
        // 端口
        port: 6666,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开始HMR功能
        hot: true,
        // 不要显示启动服务器的日志信息
        clientLogLevel: 'none',
        // 除了 一些基本信息启动信息外，其他内容都不显示
        quiet: true,
        // 如果报错，不会全屏提示， 
        overlay: false,
        // 服务器代理 解决开发环境的跨域问题
        proxy:{
            '/api':{
                target: 'http://localhost:6666',
                // 发送请求时，路径重写， /api/xxx ==> /xxx
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },

    optimization:{
        splitChunks:{
            // 代码分割
            chunks: 'all',
            minSize: 30*1024, // 分割的chunk最小为30kb
            maxSize: 0, // 最大没有限制
            
        }
    }
}