/*
-------------------------------------------------------------------------------------------------------------------------------------------
	redmark/examples/jobs/job_limit_setup.js
	July 2nd, 2011
	Redmark v1.0.0
	
	Note: Assumes redmark has been installed through npm
	
	Description:
		An example demonstrating how to setup the limiting on a job when it is created.
-------------------------------------------------------------------------------------------------------------------------------------------

	Redmark accepts configuration options on the seed function that will then be applied only to that job. If no options are 
	given, a job will inherit the redmark global limiting defaults.

	We'll setup this job to be limited at running 60 times an hour. Also note that by not giving the pool start value this job will
	inherit the global default.

*/

var queue = require("redmark");
var jobid = queue.seed(function() {
	console.log("get to work!");
}, {
	time : (60 * 60 * 1000),
	total : 60,
	max : (60 * 60 * 1000)
});