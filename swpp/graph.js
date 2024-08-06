var fs = require("fs"),
    redis = require("redis"),
    client = redis.createClient();

var graph = [];

// log errors
client.on("error", function (err) {
   console.log("Error: " + err);
});

function SADD_key(name, value){
    client.sadd(name, value, function(err,res) {
        if (err) {
            console.log('Smth wrong: ' + err);
        }
        // console.log(name + " _ " + value);
        client.quit();
    });
}

function addWay(from, to , length){

    var arr = [],
        obj = {
            'from' : from,
            'to' : to,
            'length' : length,
            'way' : from + ' > ' + to
        };

    for (var i=0; i<graph.length; i++) {
        if (graph[i].to == from) {
            if (graph[i].from!==to) {
                var way = {
                    'from' : graph[i].from,
                    'to' : to,
                    'length' : graph[i].length + length,
                    'way' : graph[i].way + ' > ' + to
                }
                graph.push(way);
                SADD_key("from:"+way.from, JSON.stringify(way));
                SADD_key("to:"+way.to, JSON.stringify(way));
            }
        }
        if (graph[i].from == to) {
            if (from!==graph[i].to) {
                var way = {
                    'from' : from,
                    'to' : graph[i].to,
                    'length' : graph[i].length + length,
                    'way' : from + ' > ' + graph[i].way
                }
                graph.push(way);
                SADD_key("from:"+way.from, JSON.stringify(way));
                SADD_key("to:"+way.to, JSON.stringify(way));
            }
        }
    }

    graph.push(obj);
    SADD_key("from:"+obj.from, JSON.stringify(obj));
    SADD_key("to:"+obj.to, JSON.stringify(obj));
}

addWay(1, 2, 1);
addWay(2, 3, 1);
addWay(2, 4, 1);
addWay(3, 5, 1);
addWay(3, 4, 1);
addWay(5, 1, 1);

fs.writeFile('graph.txt', JSON.stringify(graph), function (err) {
    if (err) throw err;
    console.log('data was writed to graph.txt');
});

console.log(graph);