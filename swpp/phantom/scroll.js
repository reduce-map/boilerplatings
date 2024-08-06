var page = require('webpage').create();

// page.settings.userAgent = 'WebKit/534.46 Mobile/9A405 Safari/7534.48.3';
page.settings.viewportSize = { width: 400, height: 600 };
page.open('http://developerslife.ru/', function (status) {
    if (status !== 'success') {
        console.log('Unable to load BBC!');
        phantom.exit();
    } else {
        page.clipRect = { left: 0, top: 0, width: 400, height: 600 };
        page.render('screenshots/page3.png');
        page.clipRect = { left: 0, top: 600, width: 400, height: 600 };
        page.render('screenshots/page4.png');
        phantom.exit();
    }
})