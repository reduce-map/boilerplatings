var http = require("http"),
    fs = require("fs");

var proxyServers = [
        {
            host : '177.195.97.120',
            port : 3128
        },
        {
            host : '110.77.209.190',
            port : 3128
        },
        {
            host : '202.149.78.234',
            port : 8080
        },
        {
            host : '89.144.131.108',
            port : 8080
        },
        {
            host : '83.111.92.120',
            port : 3128
        },
        {
            host : '123.123.12.123',
            port : 1234
        }
    ],
    site = "https://www.google.com.ua/";

function proxyCheck(site, proxyServers) {
    var proxyServerNumber = Math.floor(Math.random() * (proxyServers.length));
    console.log(
        'proxyServerNumber ' + proxyServerNumber + ' \n' +
        'proxyServer host ' + proxyServers[proxyServerNumber].host + ' \n' +
        'proxyServer port ' + proxyServers[proxyServerNumber].port + ' \n' +
        'site ' + site
    );
    http.get ({
        host: proxyServers[proxyServerNumber].host,
        port: proxyServers[proxyServerNumber].port,
        path: site
    }, function (response) {
        console.log(response);
        var data = '';
        response.on("data", function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            fs.writeFile('response_proxy.txt', data, function (err) {
                if (err) throw err;
                console.log('Profit');
            });
        });
    }).on('error', function(e) {
        console.log( "------------------------------------" );
        console.log( "------------------------------------" );
        console.log("Got error: " + e.message);
        console.log( e.stack );
        console.log( "------------------------------------" );
        console.log( "------------------------------------" );
        console.log("this proxy sever will be deleted ");
        console.log(
            'proxyServerNumber ' + proxyServerNumber + ' \n' +
            'proxyServer host ' + proxyServers[proxyServerNumber].host + ' \n' +
            'proxyServer port ' + proxyServers[proxyServerNumber].port);
        console.log( "------------------------------------" );
        console.log( "------------------------------------" );
        proxyServers.splice(proxyServerNumber,1);
        fs.writeFile('response_proxy.txt', JSON.stringify(proxyServers), function (err) {
            if (err) throw err;
            console.log('Profit');
        });
        proxyCheck(site, proxyServers);
    });
}

proxyCheck(site, proxyServers);

