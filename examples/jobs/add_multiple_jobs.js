/*
-------------------------------------------------------------------------------------------------------------------------------------------
	redmark/examples/jobs/add_multiple_jobs.js
	July 2nd, 2011
	Redmark v1.0.0
	
	Note: Assumes redmark has been installed through npm
	
	Description:
		An example demonstrating adding multiple jobs with independent queues
-------------------------------------------------------------------------------------------------------------------------------------------
*/

var queue = require("redmark");

/* Seed the foo function */
	var foo_id = queue.seed(function() {
		console.log("Foo! Get to work!");
	});

/* Seed the bar function */
	var work = function() {
		console.log("Bar! Get to work!");
	};
	var bar_id = queue.seed(work);
	
/* Add a bunch of work */
queue.add(bar_id);
queue.add(foo_id);
queue.add(foo_id);
queue.add(bar_id);
queue.add(bar_id);