var server = require('webserver').create();
var os = require('system').os;

var i=0;
var service = server.listen(8080, function(request, response) {
    console.log(/favicon/gi.test(request.url));
    if (/favicon/i.test(request.url)) {
        response.close();
        return;
    };
    i++;
    console.log('Request at ' + new Date());
    console.log(JSON.stringify(request, null, 4));
    response.statusCode = 200;
    response.write(
        '<html> ' +
        '<head>' +
        '</head>' +
        '<body>' +
        'os.architecture: ' + os.architecture + '<br /> ' +
        'os.name: ' + os.name + '<br /> ' +
        'os.version: ' + os.version + '<br /> ' +
        'i: ' + i + '<br />' +
        '</body></html>'
    );
    // for(var prop in request){
    //     console.log(prop);
    //     console.log(require[prop]);
    //     console.log('------------');
    // }
    response.close();
});