********entry 入口起点
1 string ---> './src/index.js'
    单入口
    打包形成一个chunk，输出一个bundle文件， 此时chunk的名称默认main
2 array  ['./src/index.js','./src/add.js']
    多入口
    所有入口文件最终会形成一个chunk,输出一个bundle文件，
3 object 
    多入口
    有几个入口就形成几个chunk，就输出几个bundle文件(像一些第三方文件就可以单独打包 jquery react vue....)
    entry:  {
        index:'./src/index.js',
        add: './src/add.js'
    },

********output
    output: {

    filename:"js/[name].js",
    path: resolve(__dirname, 'build')
        // 所有资源引入公共路径的前缀 -》 imgs/a.jpg ==> /imgs/a.jpg
    publicPath: '/',

    chunkFilename:'[name]_chunk.js'
        impor('./add.js'),then() 引入
},


********module  (loader)
 rules:[
            {
                test:/\.css/,
                // 多个loader
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.js/,
                //排除
                exclude: '/node_modules/',
                // 只检查 src下的js文件
                include: resolve(__dirname,'src'),
                // 优先实行  post 延后
                enforce: 'pre'，
                // 单个loader
                loader: 'eslint-loader',
            },
            {
                // 只对应一个loader
                oneOf:[]
            }
        ]




******** resolve(解析模块的规则)
resolve:{
        // 配置解析模块路径别名： 优化简写路径 缺点领没有提示
        alias:{
            '@': resolve('src'),
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名 
        extensions: ['.js','.josn','.css','.jsx'],
        // 告诉webpack解析模块是去那个目录下
        modules: [resolve(__dirname, '../../node_modules'),'node_modules']
    }



********devServer 
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
    }   