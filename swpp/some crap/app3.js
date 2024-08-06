var http = require("http"),
    fs = require("fs"),
    cheerio = require('cheerio'),
    async = require('async'),
    url = require('url');

var siteName = "pn.com.ua";

function getPageBody(path ,callback){
    var options = {
            hostname: siteName,
            path : path
        };

    var req = http.request(options).on('response', function(response) {
        var data = '';
        response.on("data", function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            callback(undefined, data);
        });

    })
    req.end();
    req.on('error', function(){})
}

function bodyParce(body, sltr){
    var $ = cheerio.load(body),
        result = {},
        ctgLinks = $(sltr).each(function(i, elem) {
            result[i] = {};
            result[i]['text'] = $(this).text();
            result[i]['href'] = $(this).attr('href');
        });

    return result;
}

function makeQueue(func, conc){
    var q = async.queue(function (path, callback) {
        func(path, callback);
    }, conc);

    return function(path, callback){
        q.push(path, callback);
    }
}

getPageBodyQueued = makeQueue(getPageBody, 2);

var objResult;

async.parallel([
    function(resultCallback){
        getPageBody( '/',
            function(err, data){
                objResult = bodyParce(data, 'a.main_page_link_catalog');
                var ctgUrls = [];

                for (var prop in objResult) {
                    ctgUrls.push(url.parse(objResult[prop]['href']).pathname);
                }

                ctgUrls = ctgUrls.map(function(item, number){
                    return function(callback){
                        getPageBody(item, function(err, data){
                            var linksPdCgt = bodyParce(data, '.ct a');
                            objResult[number]['pdCtg'] = linksPdCgt;
                            callback(null, objResult[number]);
                        })
                    }
                });

                async.parallel(ctgUrls , function(err, results){
                    var pgCtgUrls = results.map(function(item, number){
                        return function(callback){
                            getPageBody(item, function(err, data){
                                console.log(item);
                                // callback(null, objResult[number]);
                                resultCallback(null, objResult);
                            })
                        }
                    });
                });
            }
        )
    }
],
function(err, results){
    fs.writeFile('response.txt', JSON.stringify(results[0]), function (err) {
        if (err) throw err;
        console.log('Profit');
    });
});
