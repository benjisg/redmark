/*
-------------------------------------------------------------------------------------------------------------------------------------------
	redmark/examples/configuration/configure_global_defaults.js
	July 2nd, 2011
	Redmark v1.0.0
	
	Note: Assumes redmark has been installed through npm
	
	Description:
		An example demonstrating how to alter the global redmark defaults used when setting up a job for the first time.
		
		If you only want to modify the run parameters for a SINGLE job, that should be done when setting up the job and 
		not through the global defaults.
-------------------------------------------------------------------------------------------------------------------------------------------

	Configuration is done through passing in an object with the parameters you wish to override. Note that changing the
	global defaults will NOT effect any jobs that inherited from them before they were changed.
	
	By default:
		time : 1000 (time period to be broken up, 1000 milliseconds)
		total : 1 (number of jobs allowed to run within the given time period. Thus jobs default to once per second)
		max : 1000 (maximum number of milliseconds to store in the pool when jobs are not being run)
		start : 0 (the starting resources in the pool when it is initialized)
	
	We reconfigure it to:
		- jobs run once every half second by default
		- max credits to be built up is enough for 1 job run
		- pool begins with 200 credits in it
*/

var redmark = require("redmark");
redmark.configure({
	time : 500,
	total : 1,
	max : 500,
	start : 200
});