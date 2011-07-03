/*
-------------------------------------------------------------------------------------------------------------------------------------------
	redmark/examples/stats/query_job_statistics.js
	July 2nd, 2011
	Redmark v1.0.0
	
	Note: Assumes redmark has been installed through npm
	
	Description:
		An example demonstrating how to query the run statistics across all jobs and a single job.
-------------------------------------------------------------------------------------------------------------------------------------------

	The stats method returns an object with statistics for either all of the current queues or just a single specified queue. 
	The current stats include (for each queue) the total number of runs, total runtime across all runs, average runtime for
	each work item in the queue.

*/

var queue = require("redmark");

/* Setup some work; the bar function is used to query the stats globally and for foo */
var foo_id = queue.seed(function() {
	console.log("Foo! Get to work!");
});

var work = function() {
	console.log("Bar! Get to work!");
	
	/* Query the stats of all queues */
	console.log(queue.stats());

	/* Query the stats of a single queue */
	console.log(queue.stats(foo_id));
};
var bar_id = queue.seed(work);

queue.add(bar_id);
queue.add(foo_id);
queue.add(foo_id);
queue.add(bar_id);
queue.add(bar_id);

