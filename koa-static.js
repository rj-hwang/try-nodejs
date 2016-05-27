var serve = require('koa-static');
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

// response
app.use(serve('.', {index: "index.htm"}));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// error
app.on('error', function(err){
  log.error('server error', err);
});