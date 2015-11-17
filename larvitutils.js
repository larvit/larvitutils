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

/**
 * Formats an uuid string
 * For example adds missing "-", trimming spaces etc
 *
 * @param str uuidStr - Can also take a buffer
 * @return str uuid string or false on failure
 */
exports.formatUuidStr = function(uuidStr) {

	// If a buffer, get the string representation
	if (Buffer.isBuffer(uuidStr))
		uuidStr = uuidStr.toString('hex');

	// Now uuidStr MUST be a string
	if (typeof uuidStr !== 'string')
		return false;

	// Remove all but hex characters
	uuidStr = uuidStr.replace(/[^A-Fa-f0-9]/g, '');

	// All uuid strings have exactly 32 hex characters!
	if (uuidStr.length !== 32)
		return false;

	// Add dashes in the right places
	uuidStr = uuidStr.substring(0, 8) + '-' + uuidStr.substring(8, 12) + '-' + uuidStr.substring(12, 16) + '-' + uuidStr.substring(16, 20) + '-' + uuidStr.substring(20);

	return uuidStr;
};