var http = require("http"),
    fs = require("fs"),
    cheerio = require('cheerio'),
    async = require('async'),
    url = require('url');

var siteName = "pn.com.ua",
    start = new Date,
    Errors = 0;


/**
    * Gets page's bage and then calls callback
    * @param {String} path
    * @param {Function} callback
*/

function getPageBody(path,callback){
    var fileName = "hash/";

    if (path === "/") {
        fileName = fileName + siteName + ".html";
    } else {
        FilePath = path.replace(/[\/\?]/g,"-");
        fileName = fileName + siteName + FilePath + ".html";
    }

    fs.exists (fileName, function (exists) {
        if (exists) {
            fs.readFile( fileName, {encoding: 'utf8', autoClose: true} ,  function (err,data) {
                if (err) throw err;
                console.log("read " + "hash: " + fileName + " url: " + path);
                callback(undefined, cheerio.load(data));
            });
        } else {
            var options = {
                    hostname: siteName,
                    path : path
                },
                req = http.request(options).on('response', function(response) {
                    var data = '';
                    response.on("data", function (chunk) {
                        data += chunk;
                    });
                    response.on('end', function () {
                        fs.writeFile(fileName, data, function (err) {
                            if (err) throw err;
                            console.log("write: " + "hash: " + fileName + " url: " + path);
                        });
                        callback(undefined, cheerio.load(data));
                    });
                });

            req.end();
            req.on('error', function(){ Errors++; });
        }
    });
}


/**
    * Makes queue of some function (with async)
    * @param {Function} func
    * @param {Number} conc
*/

function makeQueue(func, conc){
    var q = async.queue(function (path, callback) {
        func(path, callback);
    }, conc);

    return function(path, callback){
        q.push(path, callback);
    }
}

// make queue of getPageBody func
getPageBody = makeQueue(getPageBody, 5);

var count = 0;

// get main page
getPageBody('/', function(err, $){
    // parce main page
    var categories = $('a.main_page_link_catalog').map(function(a, i){
            return {
                id: $(this).attr('href').match(/([^\/]+)\/$/)[1],
                name: $(this).text(),
                link: $(this).attr('href'),
                type: 'category'
            }
        }),
        // create func arr to get subcateg pages
        ctgUrls = categories.map(function(item, itemIterator){
            return function(callback){
                // get subcateg pages
                getPageBody("/"+item.id+"/", function(err, $){
                    var sbCtg = $('.ct a').map(function(a, i){
                            return {
                                id: $(this).attr('href').match(/([^\/]+)\/$/)[1],
                                name: $(this).text(),
                                link: $(this).attr('href'),
                                type: 'subcategory'
                            }
                        });

                    item.subcategories = sbCtg;

                    // create func arr to get goods pages
                    sbCtg = sbCtg.map(function (sbItem){
                        var warnLink = !!(url.parse(sbItem.link).pathname.indexOf('/pr/'));
                        return function(callback){
                            // get goods pages
                            getPageBody(url.parse(sbItem.link).pathname , function(err, $){
                                // paging
                                var pages = $('.pager li').last().text(),
                                    subPages = [];

                                for (var i = 1; i < pages; i++) {
                                    subPages.push(
                                        {
                                            path: url.parse(sbItem.link).pathname + '?page=' + i,
                                            number: i
                                        }
                                    );
                                }

                                if (warnLink) {
                                    subPages = subPages.map(function(sbItemPage){
                                        return function(callback){
                                            // get goods sub pages
                                            getPageBody(sbItemPage.path , function(err, $){
                                                // parce sub goods page
                                                var subGoodsList = $('.catalog .item').map(function(i, elem) {
                                                        return {
                                                            productName: $(this).children(".name").children("a").text(),
                                                            productLink: $(this).children(".name").children("a").attr('href'),
                                                            averagePrice: $(this).children(".price").children('strong').text(),
                                                            type: "goods"
                                                        }
                                                    }),
                                                    // get all sub goods prices
                                                    goodPrices = subGoodsList.map(function(subGoodItem){
                                                        return function(callback){
                                                            getPageBody(url.parse(subGoodItem.productLink).pathname , function(err, $){
                                                                // parce page
                                                                var goodAllPrices = $('.propositions tr').map(function(i,elem){
                                                                    return {
                                                                        companyName: $(this).children(".cont").children("a").text(),
                                                                        companyPhone: $(this).children(".cont").children(".phone").attr('phone'),
                                                                        companyPrice: $(this).children(".price").text()
                                                                    }
                                                                });
                                                                subGoodItem.goodAllPrices = goodAllPrices;
                                                                callback(null, goodAllPrices);
                                                            })
                                                        }
                                                    });

                                                // save sub goods page
                                                sbItem['goods-page-' + sbItemPage.number]= subGoodsList;
                                                async.parallel(goodPrices, function(err, results){
                                                    callback(null, goodPrices);
                                                });

                                            })
                                        }
                                    });

                                    // goods list on the first page
                                    var goodsList = $('.catalog .item').map(function(i, elem) {
                                            return {
                                                productName: $(this).children(".name").children("a").text(),
                                                productLink: $(this).children(".name").children("a").attr('href'),
                                                averagePrice: $(this).children(".price").children('strong').text(),
                                                type: "goods"
                                            }
                                        }),
                                        // goods proces list on the first page
                                        goodsPrices = goodsList.map(function(goodItem){
                                            return function(callback){
                                                getPageBody(url.parse(goodItem.productLink).pathname , function(err, $){
                                                    // parce goodPrices
                                                    var goodAllPrices = $('.propositions tr').map(function(i,elem){
                                                        return {
                                                            companyName: $(this).children(".cont").children("a").text(),
                                                            companyPhone: $(this).children(".cont").children(".phone").attr('phone'),
                                                            companyPrice: $(this).children(".price").text()
                                                        }
                                                    });
                                                    goodItem.goodAllPrices = goodAllPrices;
                                                    callback(null, goodAllPrices);
                                                })
                                            }
                                        });

                                    sbItem.goods = goodsList;

                                    var combineFuncArr = goodsPrices.concat(subPages);
                                    goodsPrices = subPages = null;

                                } else {
                                    // if link isn't hot -> parce algorithm is different
                                    // subPages = subPages.map(function(sbItemPage){
                                    //     return function(callback){
                                    //         getPageBody(sbItemPage.path , function(err, $){
                                    //             var subGoodsList = $('.price_table_tr').map(function(i, elem) {
                                    //                     return {
                                    //                         productName: $(this).children(".n").text(),
                                    //                         productPrice: $(this).children("td").eq(1).text(),
                                    //                         companyName : $(this).find(".click_rel").text(),
                                    //                         companyPhone : $(this).find(".phone_link").attr('phone')
                                    //                     }
                                    //                 });

                                    //             sbItem['goods-page-' + sbItemPage.number]= subGoodsList;
                                    //             callback(null, subGoodsList);
                                    //         })
                                    //     }
                                    // });

                                    // var goodsList = $('.price_table_tr').map(function(i,elem){
                                    //         return {
                                    //             productName: $(this).children(".n").text(),
                                    //             productPrice: $(this).children("td").eq(1).text(),
                                    //             companyName : $(this).find(".click_rel").text(),
                                    //             companyPhone : $(this).find(".phone_link").attr('phone')
                                    //         }
                                    //     }),
                                    //     combineFuncArr = subPages;

                                    combineFuncArr = [];

                                }

                                async.parallel(combineFuncArr, function(err, results){
                                    // fs.writeFile('response'+ itemIterator + '.txt', JSON.stringify(item), function (err) {
                                    //     if (err) err throw;
                                    //     console.log('data was writed to' + ' response'+ itemIterator + '.txt');
                                    // });
                                    callback(null, goodsList);
                                });

                                combineFuncArr = null;
                            })
                        }
                    });
                    async.parallel(sbCtg, function(err, results){
                        callback(null, ctgUrls);
                    });
                    sbCtg = null;
                })
            }
        });

    async.parallel(ctgUrls, function(err, results){
        console.log('site was parsed');
        console.log('---------------');
        fs.writeFile('response.txt', JSON.stringify(categories), function (err) {
            if (err) throw err;
            console.log('data was writed to response.txt');
        });
        var end = new Date,
            totalTime = (end-start)/60000;
        console.log("Process ended in " + totalTime + " min.");
        console.log('Errors \t' + Errors);
    });

    ctgUrls = null;
});