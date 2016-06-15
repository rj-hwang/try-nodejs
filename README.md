# [try-koa](http://127.0.0.1:3000)
koa2 学习

## 入门范例
```
// 在项目根目录创建
app.js   // 项目入口文件
start.js // 项目启动文件

下载依赖
$ npm install koa@next --save
$ npm install babel-core --save-dev
$ npm install babel-polyfill --save-dev
$ npm install babel-preset-es2015 --save-dev
$ npm install babel-preset-stage-3 --save-dev

编写文件 start.js
require("babel-core/register")({
	presets: ['stage-3','es2015']
});
require("babel-polyfill");
require("./app.js");

启动项目
$ npm install nodemon  -g
$ nodemon start
```