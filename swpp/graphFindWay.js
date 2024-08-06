var redis = require("redis"),
    client = redis.createClient(),
    args = process.argv.slice(2);

if (!args.length) {
    console.log('arguments were not introduced');
    console.log('-----');
    console.log('from = 1 ; to = 2');
} else if(args.length === 1){
    console.log('it is necessary to introduce another one argument');
    console.log('-----');
    console.log('ERROR');
    process.exit(code=0);
} else if (args.length > 2){
    console.log('there are a lot of args');
    console.log('-----');
    console.log('ERROR');
    process.exit(code=0);
}

var from = args[0] || 1,
    to = args[1] || 2;

// client.smembers('from:'+from, function (err, results ) {
//     console.log(results);
// });

client.sinter('from:'+from, 'to:'+to, function (err, results){
    console.log(results);
    process.exit(code=0);
});