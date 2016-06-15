/**
 * Koa 是一个 middleware framework, 提供 3 种不同类型的中间件写法
 * 1) common function (not support now)
 * 2) generatorFunction (koa1 standard)
 * 3) async function（koa2 新增, 需要 babel）
 * 详见：https://github.com/koajs/koa/blob/master/docs/guide.md
 * 
 * Debugging Koa: $ DEBUG=koa* node ...
 */
const koa = require('koa');
const app = koa();
const hostname = '127.0.0.1';
const port = 3000;

/* 1) common function (not support now)
app.use((ctx, next) => {
	console.log(">> common function 1");
	// return promise
	return next().then(() => {
		console.log("<< common function 1");
	});
});*/

// 2) generator function
// 	  函数名可选
app.use(function* (next) {
	console.log(">> generator function 1 %s", this.url);
	yield next;
	console.log("<< generator function 1 %s", this.url);
});
//   指定函数名则 '$ DEBUG=koa* node ...' 时日志更明晰:  koa:application use gf2 +4ms
app.use(function* gf2(next) {
	console.log(">> generator function 2 %s", this.url);
	yield next;
	console.log("<< generator function 2 %s", this.url);
});

// 3) async function（koa2 新增, 需要 babel）
/*
app.use(async (ctx, next) => {
	console.log(">> async function 1 %s", this.url);
	await next();
	const ms = new Date() - start;
	console.log(">> async function 1 %s", this.url);
});*/

// response
app.use(function* main() {
	this.body = 'Hello World';
	console.log("Hello World");
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});