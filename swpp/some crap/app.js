var http = require("http"),
    fs = require("fs"),
    cheerio = require('cheerio'),
    async = require('async');

var siteName = "pn.com.ua",
    concurrencyNumber = 2, data, resultObj = {};

var options = {
    hostname: siteName,
    port: 80,
    path: '/',
    method: 'GET'
};

var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
        data += chunk;
    });

    res.on('end', function() {
        var $ = cheerio.load(data),
            ctgLinks = $('a.main_page_link_catalog').each(function(i, elem) {
                resultObj[i] = {};
                resultObj[i]['text'] = $(this).text();
                resultObj[i]['href'] = $(this).attr('href');
            });

        var q = async.queue(function (obj, callback) {
            obj['pdctg'] = parceLinks(obj);
            callback();
        }, concurrencyNumber);

        q.drain = function() {
            console.log('all items have been processed');
            fs.writeFile('response.txt', JSON.stringify(resultObj), function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        }

        for (var prop in resultObj) {
            console.log(prop);
            q.push(resultObj[prop], function (err) {
                console.log(resultObj[prop]);
            });
        }
    });
});

function parceLinks(obj){
    var path = ParceUrl(obj['href']).path,
        options = {
            hostname: siteName,
            port: 80,
            path: path,
            method: 'GET'
        },
        ctgData = '',
        ctgLinksRes = {};

    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            ctgData += chunk;
        });

        res.on('end', function() {
            var $ = cheerio.load(ctgData),
                ctgLinks = $('.ct a').each(function(i, elem) {
                    ctgLinksRes[i] = {};
                    ctgLinksRes[i]['text'] = $(this).text();
                    ctgLinksRes[i]['href'] = $(this).attr('href');
                });
        });
    });
    return ctgLinksRes;
}

function ParceUrl(url){
    var parts = url.split( "#" ),
        out = {};

    out.url = url;
    out.hash = ( parts.length > 1 ? ( ( url = parts.shift() ) || 1 ) && parts.join( "#" ) : "" );
    url = ( parts = url.split( "?" ) ).shift();
    out.search = parts.join( "?" );
    out.scheme = ( parts = url.split( "://" ) ) && parts.length > 1 ? parts.shift() : "";
    out.host = ( ( parts = parts.join( "://" ).split( "/" ) ) && parts.length > 1 &&
                    parts[0].indexOf(".") > 0 || out.scheme ) && parts.shift() || "";
    out.script = parts.pop();
    out.path = ( parts.length > 0 ? "/" : "" ) + parts.join( "/" );

    return out;
}

req.on('error', function(e) {
  console.log('problem with request: ' + e.toString());
});

req.end();

// write data to request body