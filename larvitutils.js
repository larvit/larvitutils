'use strict';

/**
 * Convert hrtime diff to milliseconds
 *
 * @param arr prevTime - the output from process.hrtime() to diff to
 * @param int precision - defaults to 2
 * @return string - time diff in milliseconds rounded to given precision
 */
exports.hrtimeToMs = function(prevTime, precision) {
	var diff = process.hrtime(prevTime);

	if (precision === undefined) {
		precision = 2;
	}

	return (diff[0] * 1000 + (diff[1] / 1000000)).toFixed(precision);
};