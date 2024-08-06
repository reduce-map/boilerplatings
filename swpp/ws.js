var http = require('http'),
    Static = require('node-static'),
    net = require('net'),
    crypto = require('crypto'),
    buffer = require('buffer'),
    StringDecoder = require('string_decoder').StringDecoder,
    decoder = new StringDecoder('utf8'),
    fs = require('fs'),
    forker = require('child_process');

var clog = console.log;
clog('\nRunning under Node.js version ' + process.versions.node + ' on ' +
   process.arch + '-type processor, ' + process.platform + ' platform.');

// Static.Server
var fileServer = new Static.Server('.');

// createServer
var server = http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(8080);

server.on("upgrade", function(req, socket, upgradeHead){

  var data = '';

  // calc key
  var key = req.headers['sec-websocket-key'];
  var shasum = crypto.createHash('sha1');
  shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
  key = shasum.digest('base64');

  var headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: WebSocket',
      'Connection: Upgrade',
      'Sec-WebSocket-Accept: ' + key
    ];

  socket.setTimeout(0);
  socket.setNoDelay(true);

  socket.write(headers.concat('', '').join('\r\n'));

  socket.on('data', function(data) {
      //console.log(data);
      // console.log(data.readUInt16BE(0));
      //var a = new Buffer(data);
      // console.log(data.readUInt16BE(2));
      //console.log(typeof data);
      //console.log(a);
      //console.log(a.readUInt32BE(1));
      var a = data.readUInt8(0);
      console.log(a & 0x0F);
      console.log( (a & 0xF0) >> 7 );
      // console.log(a);
      // console.log(decodeWebSocket(data));
      // console.log(new Buffer(data, 'base64').toString('ascii'));
      // console.log(new Buffer(data).toString('ascii'));
      // console.log(new Buffer(data).toString('utf8'));
      // console.log(new Buffer(data));
      // console.log(JSON.stringify(new Buffer(data)));

      // var arr = JSON.stringify(new Buffer(data));

      // console.log(arr);
      // for (var i = 0; i < arr.length ; i++) {
      //   console.log(arr.charCodeAt(i) + "__" + i);
      // }
      // fs.writeFileSync('123.txt', data);

      // forker.exec('chcp 65001 | dir', function(err, outstr){
      //  fs.createWriteStream('123.txt', {
      //     flags: 'w',
      //     encoding: 'binary'
      //  }).write(data);
      //  forker.exec('chcp 866', function(){
      //     clog('\n' + outstr);
      //     clog('\n' + data);
      //  });
  });
});

function encodeWebSocket(bytesRaw){
    var bytesFormatted = new Array();
    bytesFormatted[0] = 129;
    if (bytesRaw.length <= 125) {
        bytesFormatted[1] = bytesRaw.length;
    } else if (bytesRaw.length >= 126 && bytesRaw.length <= 65535) {
        bytesFormatted[1] = 126;
        bytesFormatted[2] = ( bytesRaw.length >> 8 ) & 255;
        bytesFormatted[3] = ( bytesRaw.length      ) & 255;
    } else {
        bytesFormatted[1] = 127;
        bytesFormatted[2] = ( bytesRaw.length >> 56 ) & 255;
        bytesFormatted[3] = ( bytesRaw.length >> 48 ) & 255;
        bytesFormatted[4] = ( bytesRaw.length >> 40 ) & 255;
        bytesFormatted[5] = ( bytesRaw.length >> 32 ) & 255;
        bytesFormatted[6] = ( bytesRaw.length >> 24 ) & 255;
        bytesFormatted[7] = ( bytesRaw.length >> 16 ) & 255;
        bytesFormatted[8] = ( bytesRaw.length >>  8 ) & 255;
        bytesFormatted[9] = ( bytesRaw.length       ) & 255;
    }
    for (var i = 0; i < bytesRaw.length; i++){
        bytesFormatted.push(bytesRaw.charCodeAt(i));
    }
    return bytesFormatted;
}

function decodeWebSocket (data){
    var datalength = data[1] & 127;
    var indexFirstMask = 2;
    if (datalength == 126) {
        indexFirstMask = 4;
    } else if (datalength == 127) {
        indexFirstMask = 10;
    }
    var masks = data.slice(indexFirstMask,indexFirstMask + 4);
    var i = indexFirstMask + 4;
    var index = 0;
    var output = "";
    while (i < data.length) {
        output += String.fromCharCode(data[i++] ^ masks[index++ % 4]);
    }
    return output;
}

console.log("Server started at 127.0.0.1:8080");