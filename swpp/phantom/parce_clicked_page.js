// url, resultUrl, postUrl and default phrase
var indexPage = "http://developerslife.ru/",
    resultUrl = "",
    postUrl = "",
    phrase = "Авто-бекап";

// page system require
var page = new WebPage(),
    system = require('system');

// system.args block
if (system.args.length > 2) {
    console.log("a lot of arguments");
    phantom.exit();
};

if (system.args[1]) {
    phrase = system.args[1];
};

// regExp to find the words
var regExp = RegExp(phrase,"gi");

// without loadImages
page.settings.loadImages = false;
page.viewportSize = { width: 1000, height: 4000 };

// onConsoleMessage
page.onConsoleMessage = function (msg){
    if (!(/Unsafe JavaScript attempt to access frame with URL/gi.test(msg))) {
        console.log(msg);
    };
};

// onLoadFinished
page.onLoadFinished = function (status) {

    if (status === 'success' ){
        // inject jquery
        page.injectJs('jquery.js');
        var res = page.evaluate(function(regExp, resultUrl, postUrl) {

            var postsTitles = $(".entry .code .value").not('.rating').each(function(){
                    if (regExp.test($(this).text())) {
                        resultUrl = document.URL;
                        postUrl = "http://developerslife.ru" + $(this).closest(".entry").find(".entryLink").not('.comment').attr("href");
                        return false;
                    }
                });

            if (resultUrl) {
                return {
                    'resultUrl' : resultUrl,
                    'postUrl' : postUrl
                }
            } else {
                var link = $(".pagination .jslink.nextPage");
                if (link) {
                    return link.offset();
                } else {
                    return "nothing";
                }
            }

        }, regExp, resultUrl, postUrl);

        if (typeof res === "string" && res === "nothing") {
            console.log('nothing was found');
            phantom.exit();
        } else if(!!res.resultUrl && !!res.postUrl) {
            console.log("resUrl:  " + res.resultUrl);
            console.log("postUrl: " + res.postUrl);
            phantom.exit();
        } else {
            // console.log('res.left : ' + res.left);
            // console.log('res.top : ' + res.top);
            page.sendEvent("click", res.left + 2, res.top + 2);
            // console.log('-----------');
        }
    }
};

page.open(indexPage);