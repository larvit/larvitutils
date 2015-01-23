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
 * Get JSON data from an URL and format it for partial rendering in larvit framework
 *
 * @param str url - local to this server
 * @param func callback(err, obj)
 */
exports.getPartialData = function(url, callback) {
	var router  = require('larvitrouter')(),
	    tmpReq  = {'url': url}, // Simulate a request object
	    path    = require('path'),
	    appPath = path.dirname(require.main.filename);

	router.resolve(tmpReq, function(err) {
		var controller;

		if (err) {
			callback(err);
			return;
		}

		if (tmpReq.controllerName === undefined) {
			err = new Error('No controller name resolved for API partial data call: "' + url + '"');
			callback(err);
			return;
		}

		controller = require(path.join(appPath, '/controllers', url));

		controller.run(tmpReq, {}, function(err, request, response, data) {
			var returnData = {
				'url': url,
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