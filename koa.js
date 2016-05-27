var koa = require('koa');
var app = koa();
const hostname = '127.0.0.1';
const port = 3000;

// x-response-time
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  var req = this.req;
  // x-forwarded-for: client, proxy1, proxy2, proxy3
  var clientIp = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  console.log("%s %s %s %sms - %s", new Date().toLocaleString(), clientIp, this.method, this.get('X-Response-Time'), this.url);
});

// response
app.use(function *(){
  this.body = 'Hello World';
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});