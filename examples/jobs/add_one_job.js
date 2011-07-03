/*
-------------------------------------------------------------------------------------------------------------------------------------------
	redmark/examples/jobs/add_one_job.js
	July 2nd, 2011
	Redmark v1.0.0
	
	Note: Assumes redmark has been installed through npm
	
	Description:
		An example demonstrating different ways to add a single job
-------------------------------------------------------------------------------------------------------------------------------------------

	Redmark uses a SHA1 hash of the string representation of the function passed in to geneate a unique id to identify that
	job. This allows you to later add jobs to a queue with either that unique id or with a copy of the function. This also serves 
	to prevent collisions that could affect the validity of each queue.
	
	Both of the examples below achieve the same result.
	
*/

/* Option 1: inline the function that will be doing the work */
var queue = require("redmark");
var jobid = queue.seed(function() {
	console.log("get to work!");
});
queue.add(jobid);

/* Option 2: pass in a function by reference */
var queue = require("redmark");
var work = function() {
	console.log("get to work!");
};
var jobid = queue.seed(work);
queue.add(jobid);