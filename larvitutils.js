'use strict';

/**
 * Convert hrtime to milliseconds
 *
 * @param arr prevTime - the output from process.hrtime() to diff to
 * @param int precision - defaults to 2
 * @return float - time diff in milliseconrds rounded to given precision
 */
exports.hrtimeToMs = function(prevTime, precision) {
	var diff = process.hrtime(prevTime);

	if (precision === undefined) {
		precision = 2;
	}

	return (diff[0] * 1000 + (diff[1] / 1000000)).toFixed(precision);
};

/**
 * Get JSON data from an internal URL and format it for partial rendering in larvit framework
 *
 * @param obj request - created request object
 * @param func callback(err, obj)
 */
exports.getPartialData = function(request, callback) {
	var router  = require('larvitrouter')(),
	    path    = require('path'),
	    appPath = path.dirname(require.main.filename);

	router.resolve(request, function(err) {
		var controller;

		if (err) {
			callback(err);
			return;
		}

		if (request.controllerName === undefined) {
			err = new Error('No controller name resolved for API partial data call: "' + request.url + '"');
			callback(err);
			return;
		}

		controller = require(path.join(appPath, '/controllers', request.url));

		controller.run(request, {}, function(err, request, response, data) {
			var returnData = {
				'url': request.url,
				'data': data
			};

			if (err) {
				callback(err);
				return;
			}

			callback(null, returnData);
		});
	});
};