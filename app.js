/**
 * Koa2 是一个 middleware framework, 提供 3 种不同类型的中间件写法
 * 1) common function
 * 2) generatorFunction （需要 convert）
 * 3) async function（需要 babel）
 * 详见：https://github.com/koajs/koa/tree/v2.x
 * 
 * Debugging Koa: $ DEBUG=koa* nodemon start
 * 2016-04-16 快速开始Koa2：http://my.oschina.net/u/1416844/blog/660951
 */
const Koa = require('koa');
const convert = require('koa-convert');
const app = new Koa();

const port = 3000;
const hostname = '127.0.0.1';

// 1) async function
app.use(async (ctx, next) => {
	console.log(">> async function 1 %s", ctx.url);
	await next();
	console.log(">> async function 1 %s", ctx.url);
});

// 2) common function (not support now)
app.use((ctx, next) => {
	console.log(">> common function 1");
	// return promise
	return next().then(() => {
		console.log("<< common function 1");
	});
});

// 3) generator function
// 	  函数名可选
app.use(convert(function* (next) {
	console.log(">> generator function 1 %s", this.url);
	yield next;
	console.log("<< generator function 1 %s", this.url);
}));
//   指定函数名则 '$ DEBUG=koa* node ...' 时日志更明晰:  koa:application use gf2 +4ms
app.use(convert(function* gf2(next) {
	console.log(">> generator function 2 %s", this.url);
	yield next;
	console.log("<< generator function 2 %s", this.url);
}));

// response
app.use(ctx => {
	console.log("Hello World");
	ctx.body = 'Hello World';
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});