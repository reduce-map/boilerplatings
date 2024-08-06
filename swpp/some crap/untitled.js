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
                                                // console.log(resultProducts[i]['productName']);
                                                // console.log(resultProducts[i]['productLink']);
                                                // console.log(resultProducts[i]['productPrice']);
                                            });
                                        result[prop]['ctg'][prop_2]['podctg'] = resultProducts;
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
fs.writeFile('response.txt', JSON.stringify(result), function (err) {
    if (err) throw err;
    // console.log('It\'s saved!');
});