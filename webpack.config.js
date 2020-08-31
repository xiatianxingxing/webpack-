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
    entry: './src/index.js',

    // 输出
    output: {
        filename:"build.js",
        // __dirname nodejs变量  指的是当前文件的目录绝对路径  也就是webpack.config.js当前目录
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module:{
        rules:[
            {
                // 文件为。css后缀的
                test: /\.css$/,
                //  从右往左，从下到上执行
                use:['style-loader','css-loader']
            },
            {
                // 文件为.less后缀的
                test: /\.less$/,
                //  从右往左，从下到上执行
                use:['style-loader','css-loader','less-loader']
            },
            {
                // 文件为.less后缀的
                test: /\.(png|jpg|gif)$/,
                //  loader 只能下一个  url-loader 会依赖一个file-loader
                loader:'url-loader',
                options:{
                    // 图片大小8kb，小于8kb的就会被base64处理， 优点：减少请求数量  缺点：图片体积会更大
                    limit: 8*1025,
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片 负责引入img，从而能被url-loader识别
                loader: 'html-loader'
            },
            // {
            //     // 排除其他资源 (排除css,js,html)以外的文件用的loader
            //     exclude: /\.(css|js|html|less|json)$/,
            //     loader: 'file-loader',
            //     //  修改输出名称长度
            //     options:{
            //         name:'[hash:10].[ext]'
            //     }
                
            // }
        ]
    },
    // 插件配置
    plugins:[
        
        // 功能：默认会创建一个空的HTML。会自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            // 复制new。html 会自动引入打包输出的所有资源
            template: './src/new.html'
        })
        
    ],
    // 模式
    mode: 'development',
    // mode: production,
    // 开发服务器 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器..)
    // 特点： 只会在内存中编译打包，不会有任何输出 
    // 启动指令 npx webpack-dec-server 
    devServer:{
        // 项目构建输出路径
        contentBase: resolve(__dirname,'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 8888,
        // 自动打开浏览器
        open: true,
        inline: true,          // 当源文件改变时会自动刷新页面

    }
}