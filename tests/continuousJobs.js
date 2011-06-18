
/* Continuous job insertion test */

var queue = require("./redmark.js");

var id = queue.add(function() { 
	console.log("Boom da rando! [" + (+new Date()) + "]"); 
	console.log(queue.stats());
}, [], { time : 1000, total : 1, max : 2000});

setInterval(function() {
	queue.add(id);
}, (Math.random() * 51));