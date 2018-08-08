'use strict';

const	topLogPrefix	 = 'larvitutils: index.js: ';

function Utils(options) {
	const	that	= this;

	if ( ! that) {
		throw new Error('This library must be instanciated.');
	}

	that.options	= options || {};

	if ( ! that.options.log) {
		that.options.log	= new that.Log();
	}

	that.log	= that.options.log;
}

/**
 * Convert hrtime diff to milliseconds
 *
 * @param arr prevTime - the output from process.hrtime() to diff to
 * @param int precision - defaults to 2
 * @return string - time diff in milliseconds rounded to given precision
 */
Utils.prototype.hrtimeToMs = function hrtimeToMs(prevTime, precision) {
	const	diff	= process.hrtime(prevTime);

	if (precision === undefined) {
		precision	= 2;
	}

	return (diff[0] * 1000 + (diff[1] / 1000000)).toFixed(precision);
};

Utils.prototype.escapeRegExp = function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};

/**
 * Formats an uuid string
 * For example adds missing "-", trimming spaces etc
 *
 * @param str uuidStr - Can also take a buffer
 * @return str uuid string or false on failure
 */
Utils.prototype.formatUuid = function formatUuid(uuidStr) {

	// If a buffer, get the string representation
	if (Buffer.isBuffer(uuidStr)) {
		uuidStr	= uuidStr.toString('hex');
	}

	// Now uuidStr MUST be a string
	if (typeof uuidStr !== 'string') {
		return false;
	}

	// Remove all but hex characters
	uuidStr	= uuidStr.replace(/[^A-Fa-f0-9]/g, '').toLowerCase();

	// All uuid strings have exactly 32 hex characters!
	if (uuidStr.length !== 32) {
		return false;
	}

	// Add dashes in the right places
	uuidStr	= uuidStr.substring(0, 8) + '-' + uuidStr.substring(8, 12) + '-' + uuidStr.substring(12, 16) + '-' + uuidStr.substring(16, 20) + '-' + uuidStr.substring(20);

	return uuidStr;
};

/**
 * Replace all occurances of a string in a string and return the result
 *
 * @param	str	search
 * @param	str	replace
 * @param	str	str
 *
 * @return str
 */
Utils.prototype.replaceAll = function replaceAll(search, replace, str) {
	const	that	= this;
	return str.replace(new RegExp(that.escapeRegExp(search), 'g'), replace);
};

/**
 * Make a buffer from an uuid string
 *
 * @param str uuidStr - Can be with or without dashes, padded spaces etc will be trimmed
 * @return buffer or false on fail
 */
Utils.prototype.uuidToBuffer = function uuidToBuffer(uuidStr) {
	const	logPrefix	= topLogPrefix + 'uuidToBuffer() - ',
		that	= this;

	if (typeof uuidStr !== 'string') {
		const	stack	= new Error().stack;
		that.log.warn(logPrefix + 'uuidStr is not a string, but a ' + (typeof uuidStr));
		that.log.verbose(logPrefix + stack);
		return false;
	}

	// Remove all but hex characters
	uuidStr = uuidStr.replace(/[^A-Fa-f0-9]/g, '');

	// All uuid strings have exactly 32 hex characters!
	if (uuidStr.length !== 32) {
		const	stack	= new Error().stack;
		that.log.warn(logPrefix + 'uuidStr should be exactly 32 characters after regex, but is: ' + uuidStr.length);
		that.log.verbose(logPrefix + stack);
		return false;
	}

	return new Buffer(uuidStr, 'hex');
};

/**
 * Check if input is an int
 *
 * @param	mixed	Value to check
 * @return	Boolean
 */
Utils.prototype.isInt = function isInt(value) {
	const	x	= parseFloat(value);

	if (isNaN(value)) {
		return false;
	}

	return (x | 0) === x;
};

Utils.prototype.Log = function Log(options) {
	const	that	= this;

	that.options	= options || {};

	if (typeof that.options === 'string') {
		that.options	= {'level': that.options};
	}

	if ( ! that.options.level) {
		that.options.level	= 'info';
	}
};

Utils.prototype.Log.prototype.stdout = function stdout(lvl, msg) {
	console.log((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
};

Utils.prototype.Log.prototype.stderr = function stderr(lvl, msg) {
	console.error((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
};

Utils.prototype.Log.prototype.silly = function silly(msg) {
	if (this.options.level === 'silly') this.stdout('sil', msg);
};

Utils.prototype.Log.prototype.debug = function debug(msg) {
	if (['silly', 'debug'].indexOf(this.options.level) !== - 1) {
		this.stdout('deb', msg);
	}
};

Utils.prototype.Log.prototype.verbose = function verbose(msg) {
	if (['silly', 'debug', 'verbose'].indexOf(this.options.level) !== - 1) {
		this.stdout('ver', msg);
	}
};

Utils.prototype.Log.prototype.info = function info(msg) {
	if (['silly', 'debug', 'verbose', 'info'].indexOf(this.options.level) !== - 1) {
		this.stdout('inf', msg);
	}
};

Utils.prototype.Log.prototype.warn = function warn(msg) {
	if (['silly', 'debug', 'verbose', 'info', 'warn'].indexOf(this.options.level) !== - 1) {
		this.stderr('war', msg);
	}
};

Utils.prototype.Log.prototype.error = function error(msg) {
	if (['silly', 'debug', 'verbose', 'info', 'error'].indexOf(this.options.level) !== - 1) {
		this.stderr('err', msg);
	}
};

exports = module.exports = Utils;