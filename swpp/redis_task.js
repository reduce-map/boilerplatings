var redis = require("redis"),
    client = redis.createClient();

// log errors
client.on("error", function (err) {
   console.log("Error: " + err);
});

function setKey(name, value){
    client.set(name, value, function (err, repl) {
        if (err) {
            // Оо что то случилось при записи
            console.log('Что то случилось при записи: ' + err)
            console.log(repl);
        }
        client.quit();
    });
}

function getKey(name){
    client.get(name, function (err, repl) {
        if (err) {
            console.log('Что то случилось при чтении: ' + err);
        } else if (repl) {
            // Ключ найден
            console.log('Ключ: ' + repl);
        } else {
            // Ключ ненайден
            console.log('Ключ ненайден.')
        };
        //Закрываем соединение, так как нам оно больше не нужно
        client.quit();
    });
}

var graph = {

    1 : [2, 3],

    2 : [1, 3],

    3 : [1, 2, 4],

    4 : [3]

}

var visited = [],
    ways = [],
    counter = 0 ;

function findPosPoints(p){
    var passedPoints = [],
        resultArr = graph[p];

    for (var i = 0; i < graph[p].length; i++){
        for (var j = 0; j < visited.length; j++) {
            if (visited[j]==graph[p][i] ) {
                passedPoints.push(graph[p][i]);
            }
        }
    }

    for (var i = 0; i < passedPoints.length; i++) {
        resultArr.splice(resultArr.indexOf(passedPoints[i]), 1);
    }

    return resultArr;
}

function findWays(point, posPoint, obj){

}

function find(start, end){

    var point = start,
        ways = {};

    visited.push(start);

    for (var i = 0, PosPoints = findPosPoints(point); i < PosPoints.length; i++) {
        findWays(point, PosPoints[i], ways);
    }

}

find(1, 3);