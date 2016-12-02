const nano = require('nanomsg');

const sub = nano.socket('sub');

let addr = 'tcp://127.0.0.1:7789'
//let addr = `ipc:///${__dirname}/var/foo.ipc`
sub.connect(addr);

let i = 0
sub.on('data', function (buf) {
  i++
  console.log(i, String(buf));
});

setTimeout(() => {
  console.log('closing sub')
  sub.close()
}, 11000)
