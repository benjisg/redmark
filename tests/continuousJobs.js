
/* Continuous job insertion test */

var queue = require("../redmark.js");

var id = queue.seed(function() { 
	console.log("Running a job [" + (+new Date()) + "]"); 
	console.log(queue.stats());
	console.log();
}, { time : 1000, total : 1, max : 2000});

setInterval(function() {
	queue.add(id, []);
}, (Math.random() * 51));
