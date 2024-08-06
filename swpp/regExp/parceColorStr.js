// all available colors
var colors = {
        'reset': '\033[0m',
        'underline': '\033[4m',
        'black': '\033[30m',
        'red': '\033[31m',
        'green': '\033[32m',
        'yellow': '\033[33m',
        'blue': '\033[34m',
        'magenta': '\033[35m',
        'cyan': '\033[36m',
        'white': '\033[37m'
    },
    // color names's array
    colorsArr = [];

for (var prop in colors) {
    colorsArr.push(prop);
}

// color names's string
var colorsStr = colorsArr.join('|');
console.log(colorsStr);

// string to parce
var str = colors.reset + "123 {blue blue text {green green text {black black text} green text } text} 123 {blue blue text {green green text {black black text} green text } text}",
    str_2 = colors.reset + "123 {blue some blue text} 123",

    // reg exp to find substring
    regFindSubStr = new RegExp("\{("+colorsStr+")\\s[\\w|\\s|\033[..m]*\}","gi"),

    // reg exp to find string without brackets
    regFdStrWthBr = /\s[\w|\s|\u001b\[]+/gi;

    // regexp = /\{[^\}]*$/gi;
    var s = "{blue SDLKFn}";
    console.log(s.match(regFindSubStr));


console.log( colors.reset + "input  : " + str);

function findColor (colorName){
    var foundColor = "",
        counter = 0;

    for (var prop in colors) {
        if (colorName == prop) {
            foundColor = colors[prop];
            break;
        };
        ++counter;
    }

    return {
        'color': foundColor,
        'pos': counter,
        'colorName': colorName
    }
}

// replacer for reg exp .replace
function replacer(str, FoundColor){
    var color = findColor(FoundColor);

    str = str.replace(/\u001b\[0m/gi, function(str){ return color.color });

    var substr = color.color + str.match(regFdStrWthBr)[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
            + colors.reset;

    return substr;
}

function parceStr(strg){
    var replStr = strg.replace(regFindSubStr, replacer);
    return replStr;
}

var condition = regFindSubStr.exec(str);

while (condition) {
    str = parceStr(str);
    condition = regFindSubStr.exec(str);
    console.log(str);
};

console.log("result : " + str);

// parceStr(parceStr(parceStr(str)));