/*
	Redmark: A rate limited queue 
	Copyright Benji Schwartz-Gilbert
	June 2011
*/

var crypto = require("crypto");

/****** Work / Credits Config *****/
var 	creditsInterval = 50,
	queuedWork = [],
	queuedWorkRunning = false,
	runningWork = {},
	jobBank = {},
	workIterations = 0;
		
/****** Job Defaults Config *****/
var	defaultTime = 1000, /* Time interval to be broken up (milliseconds) */
	defaultTotal = 1, /* Number of jobs allowed to run within time interval */
	defaultMax = 1000,
	defaultStart = 0; /* Maximum amount of time credits that can be built up in the pool (milliseconds) */

/****** Run Manager *****/
var runManager = {
	setup : function(id) {
		var jobid = ++workIterations;
		runningWork[jobid] = {
			"start" : +new Date()
		};
		return jobid;
	},
	
	cleanup : function(id, jid) {
		if((id != null) && (jid != null)) {
			var history = jobBank[id].history,
				   current = runningWork["" + jid];
				   
			if((history != null) && (current != null)) {
				var end = +new Date(),
					start = current.start,
					total = end - start,
					historicalRuns = history.totalRuns + 1,
					historicalTotalRuntime = history.totalRuntime + total;
				history.totalRuns = historicalRuns;
				history.totalRuntime = historicalTotalRuntime;
				history.avgRuntime = (historicalTotalRuntime / historicalRuns);
				delete runningWork[jid];
			}
		}
	},
	
	pull : function() {
		if(queuedWork.length > 0) {
			queuedWorkRunning = true;
			var work = queuedWork.shift(),
				   jid = runManager.setup(work.id);
			
			(function() {
				work.fn.apply(null, work.data);
				runManager.cleanup(work.id, jid);
			})();
			runManager.pull();
		} else {
			queuedWorkRunning = false;
		}
	}
};


/****** Credits Manager *****/
var creditManager = {
	deposit : function(amount) {
		if((typeof amount === "number") && (amount > 0)) {
			for(var id in jobBank) {
				if(jobBank.hasOwnProperty(id)) {
					var job = jobBank[id],
						  credits = job.credits,
						  max = credits.max,
						  data = job.jobData;
					
					if(credits.pool != max) {
						credits.pool += amount;
						if(credits.pool > max) {
							credits.pool = max;
						}
					}
					
					while((data.length > 0) && (credits.pool >= credits.cost)) {
						queuedWork.push({ "id" : id, "fn" : job.fn, "data" : data.shift() });
						creditManager.withdraw(credits.cost, id);
					}
				}
			}
		}
	},
	
	withdraw : function(amount, id) {
		if((typeof amount === "number") && (amount !== 0) && (id != null)) {
			if(jobBank[id] != null) {
				jobBank[id].credits.pool -= amount;
			}
		}
	}
};

setInterval(function() {
	creditManager.deposit(creditsInterval);
	if(!queuedWorkRunning) {
		runManager.pull();
	}
}, creditsInterval);

/****** Redmark Exports *****/

/* Configure global defaults */
exports.configure = function(options) {
	if(options != null) {
		if(options.time != null) {
			defaultTime = options.time;
		}
		
		if(options.time != null) {
			defaultTotal = options.total;
		}
		
		if(options.max != null) {
			defaultMax = options.max;
		}
		
		if(options.start != null) {
			defaultStart = options.start;
		}
	}
}

/* Estimate the wait time based on the number of items waiting to be run for this job */
exports.waittime = function(id) {
	var estimate = -1;
	if(jobBank[id] != null) {
		var job = jobBank[id];
		estimate = (job.jobData.length * (job.credits.cost + job.history.avgRuntime)) - job.credits.pool;
	}
	return estimate;
}

/* Seed a job, calculating the hash and setting up the job options and storage */
exports.seed = function(job, options) {
	if(job != null) {
		var id = (crypto.createHash("sha1")).update(job.toString()).digest("hex");
		if((options != null) || (jobBank[id] == null)) {
			var options = (options || {}),
				job_time = (options.time || defaultTime),
				job_number = (options.total || defaultTotal),
				job_pool_max = (options.max || defaultMax),
				job_pool_start = ((options.start === "max") ? job_pool_max : (options.start || defaultStart)),
				job_interval = job_time / job_number;
			jobBank[id] = {
				fn : job,
				jobData : [],
				history : {
					totalRuns : 0,
					totalRuntime : 0,
					avgRuntime : 0
				},
				credits : {
					pool : job_pool_start,
					cost : job_interval,
					max : job_pool_max
				}
			};
		}
		return id;
	}
};

/* Add a job to the queue with optional data to be applied when it's run */
exports.add = function(jobid, data) {
	var result = false,
			data = (data || []);
	if(jobid != null) {
		if(typeof jobid  === "function") {
			jobid = exports.seed(jobid);
		}
		
		if(jobBank[jobid] != null) {
			jobBank[jobid].jobData.push(data);
			result = true;
		}
	}
	return result;
};

/* Query the historical stats of a single job if specified or all known jobs in the bank */
exports.stats = function(id) {
	var stats = {};
	if(id != null) {
		if(jobBank[id] != null) {
			stats[id] = jobBank[id].history;
		}
	} else {
		for(var id in jobBank) {
			if(jobBank.hasOwnProperty(id)) {
				stats[id] = jobBank[id].history;
			}
		}
	}
	return stats;
};
