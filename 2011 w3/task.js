var queue_mas = [];
function queue(func, delay) {
  queue_mas.push({ func: func, delay: delay });
}
function executeQueue() {
  queue_mas.sort(function(a, b) {
    return a.delay - b.delay;
  });
  function processQueue() {
    if ( queue_mas.length === 0) {
      console.log('all is done');
      return;
    }
    var item = queue_mas.shift();
    setTimeout(function() {
      item.func();
      processQueue();
    }, item.delay);
  }
  processQueue();
}

queue(function() {
  console.log(1000);
}, 1000);

queue(function() {
  console.log(3000);
}, 3000);

queue(function() {
  console.log(2000);
}, 2000);

setTimeout(function() {
    queue(function() {
    console.log(2500);
  }, 1500);
  executeQueue();
}, 1000);
