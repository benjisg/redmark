/*
-------------------------------------------------------------------------------------------------------------------------------------------
	redmark/examples/jobs/pass_in_data.js
	July 2nd, 2011
	Redmark v1.0.0
	
	Note: Assumes redmark has been installed through npm
	
	Description:
		An example demonstrating how to pass in data to the work functions when they are run.
-------------------------------------------------------------------------------------------------------------------------------------------

	Jobs are run using the apply method. Thus if you have a work function like so:
		
		work(foo, bar, baz) {
			...
		};
	
	You can setup the data to be passed in to the function with an array:
	
		queue.add( jobid, [foo, bar, baz]);
		
*/

var queue = require("redmark");
var jobid = queue.seed(function(foo, bar, baz) {
	console.log("Foo -> " + foo);
	console.log("Bar -> " + bar);
	console.log("Baz -> " + baz);
	console.log();
});

queue.add(jobid, ["A", "B", "C"]);
queue.add(jobid, [1, 2, 3]);