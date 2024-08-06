var sys = require('system'),
    page = require('webpage').create(),
    address = "http://developerslife.ru/",
    logResources = false,
    t,
    phrase = "собеседовании",
    regExp = RegExp(phrase,"gi"),

t = Date.now();

if (sys.args.length > 1 && sys.args[1] === "-v") {
    logResources = true;
}

function printArgs() {
    var i, ilen;
    for (i = 0, ilen = arguments.length; i < ilen; ++i) {
        console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
    }
    console.log("");
}

////////////////////////////////////////////////////////////////////////////////

page.onInitialized = function() {
    console.log("page.onInitialized");
    printArgs.apply(this, arguments);
};

page.onLoadStarted = function() {
    console.log("page.onLoadStarted");
    printArgs.apply(this, arguments);
};

page.onLoadFinished = function() {
    console.log("page.onLoadFinished");
    printArgs.apply(this, arguments);
};

page.onUrlChanged = function() {
    console.log("page.onUrlChanged");
    printArgs.apply(this, arguments);
};

page.onNavigationRequested = function() {
    console.log("page.onNavigationRequested");
    printArgs.apply(this, arguments);
};

page.onConsoleMessage = function (msg, line, source) {
    console.log('onConsoleMessage > ' + msg);
    printArgs.apply(this, arguments);
};

page.onClosing = function() {
    console.log("page.onClosing");
    printArgs.apply(this, arguments);
};

// window.console.log(msg);
page.onConsoleMessage = function() {
    console.log("page.onConsoleMessage");
    printArgs.apply(this, arguments);
};

////////////////////////////////////////////////////////////////////////////////

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {

        page.injectJs('jquery.js');

        var mainPage = page.evaluate(function(phrase, regExp) {
            var result,
                postsTitles = $(".entry .code .value").not('.rating').each(function(){
                    if (regExp.test($(this).text())) {
                        result = document.URL;
                        return false;
                    }
                });

            if (!result) {
                var nextPage = $('.pagination .jslink.nextPage');
                return nextPage;
            }

            return result;

        }, phrase, regExp);

        if (typeof mainPage !== "string") {

            page.onLoadFinished = function(status){
                console.log(window.document.innerHTML);
            }

            page.evaluate(function(mainPage) {

                var ev = document.createEvent("MouseEvents");

                ev.initEvent("click", true, true);

                document.querySelector(".pagination .jslink.nextPage").dispatchEvent(ev);

                console.log(document.URL);

            }, mainPage);

            // page.sendEvent('click', mainPage.left + 1, mainPage.top + 1);

            // var subPage = page.evaluate(function(phrase, regExp) {

            //     console.log(document.URL);

            // });


            // var subPage = page.evaluate(function(){

            //     return document.URL;
            // })
        };

    }

    phantom.exit();
});