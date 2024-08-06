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
    var $ = cheerio.load(body),
        result = {},
        ctgLinks = $(sltr).each(function(i, elem) {
            result[i] = {};
        });

    })
    req.end();
    req.on('error', function(){})
}

function makeQueue(func, conc){
    var q = async.queue(function (path, callback) {
        func(path, callback);
    }, conc);

    return function(path, callback){
        q.push(path, callback);
    }
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

getPageBodyQueued = makeQueue(getPageBody, 2);

// a = [1,2,3]
// b = a.map(function(item){
//     return function(callback){
//         callback(undefined, someResults)
//     }
// })

async.parallel([
    function(callback){
        getPageBodyQueued(
            '/',
            function(err, data){
                var result = bodyParce(data, 'a.main_page_link_catalog');
                for (var prop in result) {
                    (function(prop) {
                        getPageBodyQueued(
                            url.parse(result[prop]['href']).pathname,
                            function(err, data){
                                var linksCgt = bodyParce(data, '.ct a');
                                result[prop]['ctg'] = linksCgt;
                                for (var prop_2 in linksCgt) {
                                    (function(prop_2) {
                                        getPageBodyQueued(
                                            url.parse(linksCgt[prop_2]['href']).pathname,
                                            function(err, data){
                                                var $ = cheerio.load(data),
                                                    resultProducts = {},
                                                    productName = $('.catalog .item').each(function(i, elem) {
                                                        resultProducts[i] = {};
                                                        resultProducts[i]['productName'] = $(this).children(".name").children("a").text();
                                                        resultProducts[i]['productLink'] = $(this).children(".name").children("a").attr('href');
                                                        resultProducts[i]['productPrice'] = $(this).children(".price").children("strong").text();
                                                    });
                                                result[prop]['ctg'][prop_2]['podctg'] = resultProducts;
                                                callback(null, result);
                                            }
                                        )
                                    })(prop_2);
                                }
                            }
                        )
                    })(prop);
                }
            }
        );
    }
],
function(err, results){
    fs.writeFile('response.txt', JSON.stringify(result), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});
});

// getPageBodyQueued(
//     '/',
//     function(err, data){
//         var result = bodyParce(data, 'a.main_page_link_catalog');
//         for (var prop in result) {
//             (function(prop) {
//                 getPageBodyQueued(
//                     url.parse(result[prop]['href']).pathname,
//                     function(err, data){
//                         var linksCgt = bodyParce(data, '.ct a');
//                         result[prop]['ctg'] = linksCgt;
//                         for (var prop_2 in linksCgt) {
//                             a++;
//                             (function(prop_2) {
//                                 getPageBodyQueued(
//                                     url.parse(linksCgt[prop_2]['href']).pathname,
//                                     function(err, data){
//                                         var $ = cheerio.load(data),
//                                             resultProducts = {},
//                                             productName = $('.catalog .item').each(function(i, elem) {
//                                                 resultProducts[i] = {};
//                                                 resultProducts[i]['productName'] = $(this).children(".name").children("a").text();
//                                                 resultProducts[i]['productLink'] = $(this).children(".name").children("a").attr('href');
//                                                 resultProducts[i]['productPrice'] = $(this).children(".price").children("strong").text();
//                                                 // console.log(resultProducts[i]['productName']);
//                                                 // console.log(resultProducts[i]['productLink']);
//                                                 // console.log(resultProducts[i]['productPrice']);
//                                             });
//                                         a--;
//                                         result[prop]['ctg'][prop_2]['podctg'] = resultProducts;
//                                         console.log(a);
//                                         if (a<= 0) {
//                                             fs.writeFile('response.txt', JSON.stringify(result), function (err) {
//                                                 if (err) throw err;
//                                                 // console.log('It\'s saved!');
//                                             });
//                                         };
//                                     }
//                                 )
//                             })(prop_2);
//                         }
//                     }
//                 )
//             })(prop);
//         }
//     }
// );
