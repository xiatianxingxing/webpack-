1  下载webpack
-g 全局安装   -d 当前文件安装
npm i -g webpack  （npm install --save-dev webpack 安装到当前目录）

2  npm init  初始化 
会填一下项目名称 版本什么的信息  可以直接回车跳过
生成 package.json文件

 3 创建文件夹 app和public

app
----main.js  
----red.js
public
----index.html (html里面要引入打包后的js，名称自己定）

4 创建webpack.config.js  
里面填写 引入路径和 输出路径和名称， 和HTML引入js的名称要一致

5 输入指令 webpack(不是全局用 node_modules/.bin/webpack)
发现 没有webpack-cli(因为 webpack4版本要额为安装webpack-cli)
然后在 public文件夹中生成 dong.js文件 （成功）


6 优化命令 
在package.json文件里面 找打script属性 添加 start: webpack,  就可以用 npm run start 打包了


7 在webpage.config.js里配置 devtool属性
source-map            
在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source-map  ，但是它会减慢打包速度；

eval-source-map    
使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，
但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项

cheap-module-eval-source-map   
这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，
没有列映射，和eval-source-map选项具有相似的缺点


8 使用webpack构建本地服务
webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，
在webpack中进行配置之前需要单独安装它作为项目依赖
首先先执行命令下载 
cnpm install --save-dev webpack-dev-server

然后在webpack.config.js文件配置 devServer 
 devServer: {
    contentBase: "./public",   // 将要代理文件下的index.html
    historyApiFallback: true,  //所以的跳转将指向index.html
    port: "8086",
    inline: true,          // 当源文件改变时会自动刷新页面
    open: true,            // 自动打开浏览器
}
最后在 package.json  script里写入命令
"server": "webpack-dev-server --open"


*********性能优化 （性能，打包，运行速度，代码调试）

1、HMR hot module replacement 热模块替换（只有在development模式下使用）
一个模块发生变化，只会重新打包这一个模块
在webpack.config.js中的devServer中添加 hot: true属性即可

css 默认是可以
HTML 默认是没有HMR功能的 一般只有一个html所以没有必要加
js  默认是没有HMR功能的 
需要在index.js（引入js的文件）中加
if(module.hot){
    module.hot.accept('./xxx.js',function(){
        执行xxx,js里的方法
    })
} 


2、缓存
在development中 
我们有HMR，

在production中
我们利用hash值，这样每次构建有的js和css文件名都不一样，会重洗加载
在webpack.config.js中 输出js和css中加
output:{
    filename:'js/build.[contenthash:10].js',
    name::resolve(__dirname,'build)
}


3、oneOf 
在oneOf里的一个文件只能被一个loader处理，当一个文件要被多个loader处理是，那么一定要指定loader执行的先后顺序

4、 source-map
在webpack.config.js中配置 devtool：'source-map';
source-map:               外部  错误代码准确信息，源代码的错误位置
inline-source-map:        内联  错误代码准确信息，源代码的错误位置
hidden-source-map:        外部  错误代码准确信息，但没有错误位置
eval-source-map:          内联  每一个文件都生成对应的source-map 错误代码准确信息，源代码的错误位置
nosources-source-map      外部  错误代码准确信息，但没有错误位置
cheap-source-map          外部  错误代码准确信息，源代码的错误位置 只能精确到行
cheap-module-source-map   外部  错误代码准确信息，源代码的错误位置

5、tree shaking (树摇)
去除没有用到的代码
a 必须是es6语法   b 必须是production环境

在package.json中配置
sideEffects：false 所有代码都没有副作用（都可以进行树摇）
问题： 可能会吧css/ @babel/polyfil文件干掉
sideEffiects：['*.css']

6、 code split代码分割

a、多入口webpack.config.js 一个入口，就有一个输出的bundle（可以配置多页面多入口）
entry:{
    main:'./src/js/index.js',
    test:'./src/js/test.js'
}

b、optimization 可以将node_modules中代码单独打包一个chunk最终输出
optimization:{
    splitChunks:{
        chunks:'all'
    }
}

7 懒加载 lazy loading  使用时加载 webpackChunkNmae:'test'
预加载 prefetch   提前加载 webpackPrefetch:true 

onclick:function(){
    import(/* webpackChunkNmae:'test', webpackPrefetch:true */'./test')
        .then((data)=>{
            cosole.log(data)
        })
}

8、 PWA 渐进式网络开发应用程序(淘宝)

9、多进程打包 thread-loader 

10、externals
webpack.config.js添加属性
externals:{
    拒绝jQuery打包到包里面 用cdn方式引用（标签引用）
    jquery:'jQuery'
}

11、 动态链接库 dll 对某些库（第三方库）进行单独打包

总结
*******开发环境性能优化
1 优化打包构建速度
* HMR 
2 优化代码调试
* source-map


*******生成环境性能优化
1 优化打包构架速度
* oneOf
* babel缓存
* 多进程打包
* dll
2 优化代码运行性能
* 缓存（hash-chunkhash-contenthash)
* tree shaking (树摇)
* code split 代码分割
* 懒加载 预加载



