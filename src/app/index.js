// import '@babel/polyfill';
import { sub } from './modult1';
import { sum } from './modult2';
import a from './modult3';

import text from '../json/text.json';
import '../css/iconfont.scss'
import '../css/index.scss'

let huang = 12;
console.log(huang);

console.log(sub(1, 2));
console.log(sum(2, 3));
console.log(a.mul(4, 5));
console.log(a.div(5, 6));
console.log(text);

setInterval(() => {
    console.log("定时器到点了");
});





