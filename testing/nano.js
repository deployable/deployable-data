const nano = require('nanomsg');

const pub = nano.socket('pub');
const sub = nano.socket('sub');

let addr = 'tcp://127.0.0.1:7789'
//let addr = `ipc:///${__dirname}/var/foo.ipc`
pub.bind(addr);
sub.connect(addr);

sub.on('data', function (buf) {
  console.log(String(buf));
  pub.close();
  sub.close();
});

setTimeout(function () {
  pub.send("Hello from nanomsg!");
}, 100);

