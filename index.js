'use strict';

const topLogPrefix = 'larvitutils: index.js: ';

function Utils(options) {
	if (!this) {
		throw new Error('This library must be instanciated.');
	}

	this.options = options || {};

	if (!this.options.log) {
		this.options.log = new this.Log();
	}

	this.log = this.options.log;
}

/**
 * Convert hrtime diff to milliseconds
 *
 * @param {array} prevTime - the output from process.hrtime() to diff to
 * @param {integer} precision - defaults to 2
 * @return {string} - time diff in milliseconds rounded to given precision
 */
Utils.prototype.hrtimeToMs = function hrtimeToMs(prevTime, precision) {
	const diff = process.hrtime(prevTime);

	if (precision === undefined) {
		precision = 2;
	}

	return ((diff[0] * 1000) + (diff[1] / 1000000)).toFixed(precision);
};

Utils.prototype.escapeRegExp = function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};

/**
 * Formats an uuid string
 *
 * For example adds missing "-", trimming spaces etc
 *
 * @param {string} uuidStr - Can also take a buffer
 * @return {string} uuid string or false on failure
 */
Utils.prototype.formatUuid = function formatUuid(uuidStr) {

	// If a buffer, get the string representation
	if (Buffer.isBuffer(uuidStr)) {
		uuidStr = uuidStr.toString('hex');
	}

	// Now uuidStr MUST be a string
	if (typeof uuidStr !== 'string') {
		return false;
	}

	// Remove all but hex characters
	uuidStr = uuidStr.replace(/[^A-Fa-f0-9]/g, '').toLowerCase();

	// All uuid strings have exactly 32 hex characters!
	if (uuidStr.length !== 32) {
		return false;
	}

	// Add dashes in the right places
	uuidStr = uuidStr.substring(0, 8) + '-' + uuidStr.substring(8, 12) + '-' + uuidStr.substring(12, 16) + '-' + uuidStr.substring(16, 20) + '-' + uuidStr.substring(20);

	return uuidStr;
};

/**
 * Replace all occurances of a string in a string and return the result
 *
 * @param {string} search - What to search for
 * @param {string} replace - What to replace it with
 * @param {string} str - The string to perform this to
 * @return {string} - The result
 */
Utils.prototype.replaceAll = function replaceAll(search, replace, str) {
	return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
};


Utils.prototype.setTimeout = async function lUtilsSetTimeout(ms) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
};

/**
 * Make a buffer from an uuid string
 *
 * @param {string} uuidStr - Can be with or without dashes, padded spaces etc will be trimmed
 * @return {buffer} or false on fail
 */
Utils.prototype.uuidToBuffer = function uuidToBuffer(uuidStr) {
	const logPrefix = topLogPrefix + 'uuidToBuffer() - ';

	if (typeof uuidStr !== 'string') {
		const stack = new Error().stack;
		this.log.warn(logPrefix + 'uuidStr is not a string, but a ' + (typeof uuidStr));
		this.log.verbose(logPrefix + stack);

		return false;
	}

	// Remove all but hex characters
	uuidStr = uuidStr.replace(/[^A-Fa-f0-9]/g, '');

	// All uuid strings have exactly 32 hex characters!
	if (uuidStr.length !== 32) {
		const stack = new Error().stack;
		this.log.warn(logPrefix + 'uuidStr should be exactly 32 characters after regex, but is: ' + uuidStr.length);
		this.log.verbose(logPrefix + stack);

		return false;
	}

	return new Buffer.from(uuidStr, 'hex'); // eslint-disable-line new-cap
};

/**
 * Check if input is an int
 *
 * @param {mixed} value - The value to check
 * @return {boolean} true or false
 */
Utils.prototype.isInt = function isInt(value) {
	const x = parseFloat(value);

	if (isNaN(value)) {
		return false;
	}

	return (x | 0) === x;
};

/**
 * Simple logging instance
 *
 * @param {object | string} options[=process.env.NODE_LOG_LVL] - Optional options object or minimum log level
 * @param {string} options.level[=process.env.NODE_LOG_LVL] - log level
 */
Utils.prototype.Log = function Log(options) {
	this.options = options || {};

	if (typeof this.options === 'string') {
		this.options = { level: this.options };
	}

	if (!this.options.level && process.env.NODE_LOG_LVL) {
		this.options.level = process.env.NODE_LOG_LVL;
	} else if (!this.options.level) {
		this.options.level = 'info';
	}
};

/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */

function murmurhash3_32_gc(key, seed) {
	let remainder; let bytes; let h1; let h1b; let c1; let c2; let k1; let i;

	remainder = key.length & 3; // Same as key.length % 4
	bytes = key.length - remainder;
	h1 = seed;
	c1 = 0xcc9e2d51;
	c2 = 0x1b873593;
	i = 0;

	while (i < bytes) {
		k1 =
			((key.charCodeAt(i) & 0xff)) |
			((key.charCodeAt(++i) & 0xff) << 8) |
			((key.charCodeAt(++i) & 0xff) << 16) |
			((key.charCodeAt(++i) & 0xff) << 24);
		++i;

		k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	}

	k1 = 0;

	switch (remainder) {
	case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
	case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
	case 1: k1 ^= (key.charCodeAt(i) & 0xff);

		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= k1;
	}

	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 13;
	h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}

/**
 * Hash string into another string (A-Z, 0-9)
 *
 * @param {string} str The string to hash
 * @param {string} length Length of result string
 * @return {string} The hashed result string
 */
Utils.prototype.hashStringToString = function hashStringToString(str, length) {
	if (length === 0) return '';

	const base = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const resultIndices = new Array(length);

	for (let i = 0; i < resultIndices.length; ++i) {
		const indexHash = murmurhash3_32_gc(str, i);

		const valueIndex = Math.abs(indexHash % base.length);
		resultIndices[i] = valueIndex;
	}

	const result = resultIndices.map(x => base[x]).join('');

	return result;
};

Utils.prototype.Log.prototype.stdout = function stdout(lvl, msg) {
	console.log((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
};

Utils.prototype.Log.prototype.stderr = function stderr(lvl, msg) {
	console.error((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
};

Utils.prototype.Log.prototype.silly = function silly(msg) {
	if (this.options.level === 'silly') this.stdout('\x1b[1;37msil\x1b[0m', msg);
};

Utils.prototype.Log.prototype.debug = function debug(msg) {
	if (['silly', 'debug'].indexOf(this.options.level) !== -1) {
		this.stdout('\x1b[1;35mdeb\x1b[0m', msg);
	}
};

Utils.prototype.Log.prototype.verbose = function verbose(msg) {
	if (['silly', 'debug', 'verbose'].indexOf(this.options.level) !== -1) {
		this.stdout('\x1b[1;34mver\x1b[0m', msg);
	}
};

Utils.prototype.Log.prototype.info = function info(msg) {
	if (['silly', 'debug', 'verbose', 'info'].indexOf(this.options.level) !== -1) {
		this.stdout('\x1b[1;32minf\x1b[0m', msg);
	}
};

Utils.prototype.Log.prototype.warn = function warn(msg) {
	if (['silly', 'debug', 'verbose', 'info', 'warn'].indexOf(this.options.level) !== -1) {
		this.stderr('\x1b[1;33mwar\x1b[0m', msg);
	}
};

Utils.prototype.Log.prototype.error = function error(msg) {
	if (['silly', 'debug', 'verbose', 'info', 'error'].indexOf(this.options.level) !== -1) {
		this.stderr('\x1b[1;31merr\x1b[0m', msg);
	}
};

exports = module.exports = Utils;
