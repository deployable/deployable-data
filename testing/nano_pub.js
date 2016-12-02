const nano = require('nanomsg')

const pub = nano.socket('pub')

let addr = 'tcp://127.0.0.1:7789'
//let addr = `ipc:///${__dirname}/var/foo.ipc`
pub.bind(addr)

setInterval(() => pub.send("Hello from nanomsg!"), 100)

setTimeout(() => {
  console.log('closing pub')
  pub.close()
}, 10000)
