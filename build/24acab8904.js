
/*
    开发环境： 指令 webpack ./src/index.js -o ./build/build.js --mode=development
            webpack会以 ./src/index.js为入口文件开始打包，打包后输出到build的build.js
    
    生成环境： 指令 webpack ./src/index.js -o ./build/build.js --mode=production


*/
/* 引入json文件 */
import data from './data.json';

console.log(data)

function add(a,b){
    return a+b;
}
console.log(add(4,5))

/* 引入css */
import './css1.css';
import './new.css';
// 引入less
import './less1.less';