Redmark is a javascript work queue with the ability to control how often a job is allowed to run. Jobs are completely independent of each other and can be scheduled at different rates. This allows you to queue up jobs to a service which enforces rate limiting (example: github API v2), running them within the limits of the service and in the order they were received.

FEATURES
---------

+ Independent limiting checks for each job
+ Customizable frequency options and time resource pool settings
+ No outside module dependencies; works right out of the box
+ Built in job statistics tracking 

REQUIREMENTS
-------------
+ node.js with ssl (crypto) support
	
USAGE
------

*Add a job that can run once a second*

```javascript

// Generate the job hash id and setup the limiting options for it

// Limiting options designate this job will run once a second and we only
// allow a maximum of 1 second worth of credits to build up in the pool when
// no jobs are available to run
var jobid = queue.seed(function() {
	console.log("Running a job [" + (+new Date()) + "]"); 
}, {time : 1000, total : 1, max : 1000});

// Add a job of the seeded type to the queue with no data to pass in
queue.add(jobid, []);

```

LICENSE
--------

    The MIT License

	Copyright (c) 2011 Benji Schwartz-Gilbert

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
