const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	// 全局变量
	// -- 当前执行脚本所在的全路径，如 /Users/dragon/app/node_modules/b
	console.log("__dirname=%s", __dirname);
	// -- 当前执行脚本全路径文件名，如 /Users/dragon/app/node_modules/b/example.js
	console.log("__filename=%s", __filename);
	console.log("typeof global=%s", typeof global);
	console.log("typeof module=%s", typeof module);
	console.log("typeof exports=%s", typeof exports);
	console.log("typeof console=%s", typeof console);
	console.log("typeof require=%s", typeof require);
	console.log("typeof process=%s", typeof process);
	console.log("process.arch=%s", process.arch);	// x64|ia32|arm
	console.log("process.cwd()=%s", process.cwd());	// 进程的当前工作目录
	console.log("process.argv=%s", process.argv.join(", "));
	console.log("process.execArgv=%s", process.execArgv);
	console.log("process.execPath=%s", process.execPath);
	console.log("process.pid=%s", process.pid);
	console.log("process.platform=%s", process.platform);
	console.log("process.version=%s", process.version);
	console.log("process.release=%o", process.release);
	//console.log("process.config=%s", JSON.stringify(process.config));

	// x-forwarded-for: client, proxy1, proxy2, proxy3
	var clientIp = req.headers['x-forwarded-for'] || 
		req.connection.remoteAddress || 
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log("%s - %s", new Date().toLocaleString(), clientIp);

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});