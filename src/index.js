var Observable = require('rx').Observable

var factory = Object.keys(Observable).filter(function(key) {
  return typeof Rx.Observable[key] === 'function'
}).reduce(function (factory, method) {
  factory[method] = function(){
    Observable[method].apply(Observable, arguments)
  }
  return factory
}, {})

factory.O = Observable

factory.combineObj = function (obj) {
  var sources = [];
  var keys = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key.replace(/\$$/, ''));
      sources.push(obj[key]);
    }
  }
  return Observable.combineLatest(sources, function () {
    var argsLength = arguments.length;
    var combination = {};
    for (var i = argsLength - 1; i >= 0; i--) {
      combination[keys[i]] = arguments[i];
    }
    return combination;
  })
}

factory.combine = function (obj) {
  if (arguments.length === 1 && obj.constructor === Object){
    return factory.combineObj(obj)
  }
  return Observable.combineLatest.apply(Observable, arguments)
}
