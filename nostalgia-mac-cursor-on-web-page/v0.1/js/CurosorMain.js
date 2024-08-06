function initCursor(){

    /**
     * Creates a Base64 Image Cursor
     * opts {Object} - options for creating a cursor
     * possible to set the parameters :
     * opts.CursorLetter, opts.CursoreColor, opts.CursoreStrokeColor
     *
     * CursorFont {String} - font's name
     *
     * @return {string} - Base64 Image Cursor
     */
    function createCursor(opts, CursorFont){
        var canvasElm = document.createElement("canvas"),
            span = document.createElement("span"),
            divHolder = document.createElement("div"),
            body = document.getElementsByTagName('body')[0],
            spanWidth, spanHeight;

        span.innerHTML = opts.CursorLetter || "A";
        span.style.fontSize = opts.CursoreSize;
        divHolder.style.fontFamily = CursorFont;
        divHolder.appendChild(span);
        body.appendChild(divHolder);

        // span width and height
        spanWidth = span.offsetWidth;
        spanHeight = span.offsetHeight;
        body.removeChild(divHolder);

        if (canvasElm && canvasElm.getContext){
            var ctx = canvasElm.getContext('2d'),
                CursorLetter = opts.CursorLetter || "A",
                CursoreSize = opts.CursoreSize,
                CursoreLineWidth = 3,
                CursoreShadowBlur = 10,
                canvasElmWidth, canvasElmHeight;

            if (parseInt(CursoreSize) < 60) {
                CursoreLineWidth = 2;
                CursoreShadowBlur = 5;
            };

            // set canvasElm width and height
            canvasElmWidth  = spanWidth + 2 * CursoreLineWidth + CursoreShadowBlur;
            canvasElmHeight = spanHeight + 2 * CursoreLineWidth + CursoreShadowBlur;

            // check the maximum width and height of the cursor
            if (canvasElmWidth > 128 || canvasElmHeight > 128 || parseInt(CursoreSize) > 80) {
                CursoreSize = "80px";
                CursoreShadowBlur = 10;
                CursoreLineWidth = 3;
                spanWidth = 65;
                spanHeight = 112;
                canvasElmWidth = spanWidth + 2 * CursoreLineWidth + CursoreShadowBlur;
                canvasElmHeight = spanHeight + 2 * CursoreLineWidth + CursoreShadowBlur;
                console.log('You\'ve set impossible Cursore Font Size.');
            }

            // check for the minimum width and height of the cursor
            if (canvasElmWidth < 15 || canvasElmHeight < 15) {
                CursoreSize = "30px";
                CursoreShadowBlur = 5;
                CursoreLineWidth = 2;
                spanWidth = 19;
                spanHeight = 32;
                canvasElmWidth = spanWidth + 2 * CursoreLineWidth + CursoreShadowBlur;
                canvasElmHeight = spanHeight + 2 * CursoreLineWidth + CursoreShadowBlur;
                console.log('You\'ve set impossible Cursore Font Size.');
            }

            // set main canvas element width and height
            canvasElm.width = canvasElmWidth;
            canvasElm.height = canvasElmHeight;

            // set necessary cursor settings
            ctx.textBaseline = "top";
            ctx.font = CursoreSize + " " + CursorFont;
            ctx.lineWidth = CursoreLineWidth;

            // cursor color settings
            ctx.fillStyle = opts.CursoreColor || "#000";
            ctx.strokeStyle  = opts.CursoreStrokeColor || "#fff";

            // shadow settings
            ctx.shadowColor = opts.CursoreShadowColor || "#000";
            ctx.shadowOffsetX = CursoreLineWidth;
            ctx.shadowOffsetY = CursoreLineWidth;
            ctx.shadowBlur = CursoreShadowBlur;

            // create letter
            ctx.fillText(CursorLetter, CursoreLineWidth/2, CursoreLineWidth);

            // clear the shadow
            ctx.shadowColor = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;

            // restroke without the shaodw
            ctx.strokeText(CursorLetter, CursoreLineWidth/2, CursoreLineWidth);

            // appendChild canvasElm to body to see possible cursor
            body.appendChild(canvasElm);

            return {
                dataUrl : canvasElm.toDataURL(),
                cursorWidth : spanWidth
            }
        }

    }

    /**
     * Creates style for new cursor
     * You have to put in arguments list of objects
     *
     * Each object can contain these parameters :
     * cursorImage64 - Base64 images
     * selector - selector which will apply styles
     * coordX, coordY - Optional x- and y-coordinates.
     * typeCursor - type of the cursor
     */
    function createStyleSheet(){
        var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            styleString = [], css;

        for (var i = 0; i < arguments.length; i++) {
            var coordX = arguments[i].coordX || "",
                coordY = arguments[i].coordY || "",
                typeCursor = arguments[i].typeCursor || "default",
                selector = arguments[i].selector || "html";

            css = selector + ' { cursor: url("' + arguments[i].cursorImage64 + '") '
                + coordX + ' ' + coordY + ' ,' + typeCursor + ';}';

            styleString.push(css);
        }

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = styleString.join(" ");
        } else {
            style.appendChild(document.createTextNode(styleString.join(" ")));
        }

        head.appendChild(style);
    }

    /**
     * calls callback after loading the font
     *
     * font {String} - font's name
     * callback {Function}
     */
    function downloadFont(font, callback){
        var div = document.createElement("div"),
            span = document.createElement("span"),
            body = document.getElementsByTagName("body")[0],
            state = false, // load status of the font
            progress = 0, // progress status of the downloading time
            wait = 5000, // wait time (ms)
            step = 50, // load step
            state, spanWidth, spanHeight, spanWidthAfter, spanHeightAfter;

        // set some text with the page font
        span.innerHTML = "ABCDEFGHIKLMNOPQRSTVWXYZabcdefghiklmnopqrstvwxyz";

        // set fontSize
        div.style.Size = "20px";
        // set dispay style
        div.style.position = "absolute";
        div.style.left = "-9999px";
        div.style.top = "0";

        // can be compared with the font page or web safe wont
        // div.style.fontFamily = "Arial, Helvetica, serif";

        // appendChild this div
        div.appendChild(span);
        body.appendChild(div);

        // save div's properties - width and height
        spanWidth = span.offsetWidth;
        spanHeight = span.offsetHeight;

        // change span font-family
        span.style.fontFamily = font;

        var timer = setInterval(
            function() {
                spanWidthAfter = span.offsetWidth;
                spanHeightAfter = span.offsetHeight;
                if (spanWidthAfter!=spanWidth || spanHeightAfter!=spanHeight) {
                    state = true;
                    callback();
                    body.removeChild(div);
                    clearInterval(timer);
                }
                if (progress >= wait) {
                    console.log("the font didn't downloaded or you specified the same font of the page's font");
                    body.removeChild(div);
                    clearInterval(timer);
                }
                progress += step;
            }, step
        );

    };

    // create simple cursor
    var cursorFont = "cursorregular";

    downloadFont(cursorFont,
        function(){
            var CursoreFontSize = "100px",
                optsDefault = {
                    CursoreSize : CursoreFontSize
                },
                optsHand = {
                    CursoreSize : CursoreFontSize,
                    CursorLetter : "B"
                },
                cursorDefault = createCursor(optsDefault, cursorFont),
                handCursor = createCursor(optsHand, cursorFont),
                handDeviationVariable = 0.37,
                handDeviation = Math.round(handDeviationVariable * handCursor.cursorWidth) + "";

            createStyleSheet(
                {
                    cursorImage64 : cursorDefault.dataUrl
                },
                {
                    cursorImage64 : handCursor.dataUrl,
                    selector : "a:hover, button:hover",
                    coordX : handDeviation,
                    coordY : "0"
                }
            );
        }
    );

}

if (window.addEventListener)
    window.addEventListener("load", initCursor, false);
else if (window.attachEvent)
    window.attachEvent("onload", initCursor);