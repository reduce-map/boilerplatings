var buffer = require('buffer');

var buf = new Buffer('hi');
console.log(buf);
// node.js

console.log(buf.toString("utf-8", 0, buf.length));