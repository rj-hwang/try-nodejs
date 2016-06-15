// require hook 的作用就是替换原先的require，以便在加载自动对代码进行编译
require("babel-core/register")({
	presets: ['stage-3', 'es2015']
});

// 模拟ES6语法习惯
require("babel-polyfill");

require("./app.js");