'use strict';

/**
 * Convert a buffer to an uuid string
 *
 * @param buffer buffer
 *
 * @return str
 */
exports.bufferToUuid = function(buffer) {
	var str = buffer.toString('hex');

	str = str.substring(0, 8) + '-' + str.substring(8, 12) + '-' + str.substring(12, 16) + '-' + str.substring(16, 20) + '-' + str.substring(20);

	return str;
};

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