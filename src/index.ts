
import { InternalLogOptions, KeyValues, LogInstance, LogLevel, LogOptions, UniqueKeyValues, UtilsOptions } from './models';

const topLogPrefix = 'larvitutils: src/index.ts: ';

class Log {
	private readonly validLogLevels = ['silly', 'debug', 'verbose', 'info', 'warn', 'error', 'none'];
	private options: InternalLogOptions;

	/**
	 * Simple logging instance
	 *
	 * @param options[=process.env.NODE_LOG_LVL] - Optional options object or minimum log level
	 * @param options.level[=process.env.NODE_LOG_LVL] - log level
	 */
	constructor(options?: LogOptions | LogLevel) {
		const defaultLogLevel: LogLevel = this.getDefaultLogLevel();

		if (this.isLogLevel(options)) {
			this.options = { level: options };
		} else if (this.optionsIsLogOptions(options)) {
			if (!this.isLogLevel(options.level)) {
				this.options = { level: defaultLogLevel };
			} else {
				this.options = { level: options.level };
			}
		} else {
			this.options = { level: defaultLogLevel };
		}
	}

	public stdout(lvl: string, msg: string) {
		// tslint:disable-next-line:no-console
		console.log((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
	}

	public stderr(lvl: string, msg: string) {
		// tslint:disable-next-line:no-console
		console.error((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
	}

	public silly(msg: string) {
		if (this.options.level === 'silly') {
			this.stdout('\x1b[1;37msil\x1b[0m', msg);
		}
	}

	public debug(msg: string) {
		if (['silly', 'debug'].includes(this.options.level)) {
			this.stdout('\x1b[1;35mdeb\x1b[0m', msg);
		}
	}

	public verbose(msg: string) {
		if (['silly', 'debug', 'verbose'].includes(this.options.level)) {
			this.stdout('\x1b[1;34mver\x1b[0m', msg);
		}
	}

	public info(msg: string) {
		if (['silly', 'debug', 'verbose', 'info'].includes(this.options.level)) {
			this.stdout('\x1b[1;32minf\x1b[0m', msg);
		}
	}

	public warn(msg: string) {
		if (['silly', 'debug', 'verbose', 'info', 'warn'].includes(this.options.level)) {
			this.stderr('\x1b[1;33mwar\x1b[0m', msg);
		}
	}

	public error(msg: string) {
		if (['silly', 'debug', 'verbose', 'info', 'warn', 'error'].includes(this.options.level)) {
			this.stderr('\x1b[1;31merr\x1b[0m', msg);
		}
	}

	private getDefaultLogLevel(): LogLevel {
		if (typeof process === 'undefined' || !process || !process.env || !process.env.NODE_LOG_LVL) {
			return 'info';
		} else if (this.validLogLevels.includes(process.env.NODE_LOG_LVL || '')) {
			return process.env.NODE_LOG_LVL as LogLevel;
		} else {
			return 'info';
		}
	}

	private optionsIsLogOptions(options: LogOptions | LogLevel | undefined): options is LogOptions {
		if (options === undefined || typeof options !== 'object') {
			return false;
		} else {
			return true;
		}
	}

	private isLogLevel(options: LogOptions | LogLevel | undefined): options is LogLevel {
		if (options === undefined) {
			return false;
		}

		for (let i = 0; this.validLogLevels.length !== i; i ++) {
			if (this.validLogLevels[i] === options) {
				return true;
			}
		}

		return false;
	}
}
class Utils {
	public Log: any = Log;
	private options: UtilsOptions;
	private log: LogInstance;

	constructor(options?: UtilsOptions) {
		this.options = options || {};

		if (this.isLogInstance(this.options.log)) {
			this.log = this.options.log;
		} else {
			this.log = this.options.log = new this.Log();
		}
	}

	public getUniqueCombinations(keyValues: KeyValues): UniqueKeyValues[] {
		const response: UniqueKeyValues[] = [];

		function addUniqueCombination(curKeyVals: UniqueKeyValues, subKeyValues: KeyValues): void {
			const workSubKeyValuesName = Object.keys(subKeyValues)[Object.keys(curKeyVals).length];
			const workSubKeyValues = subKeyValues[workSubKeyValuesName];

			// If this is the last key val to look for, loop through them all, add them and return them
			if (Object.keys(curKeyVals).length === Object.keys(subKeyValues).length) {
				response.push(curKeyVals);

			// Loop through next key in line
			} else {

				for (let i = 0; workSubKeyValues.length !== i; i++) {
					const nextKeyVal = Object.assign({}, curKeyVals);
					const workSubKeyValue = workSubKeyValues[i];
					nextKeyVal[workSubKeyValuesName] = workSubKeyValue;

					addUniqueCombination(nextKeyVal, subKeyValues);
				}
			}
		}

		if (Object.keys(keyValues).length === 0) {
			return response;
		}

		// Initiate the getter by calling addUniqueCombination() for each value on the first key
		const firstKeyValuesName = Object.keys(keyValues)[0];
		const firstKeyValues = keyValues[firstKeyValuesName];
		for (let i = 0; firstKeyValues.length !== i; i++) {
			const firstKeyValue = firstKeyValues[i];
			const initKeyValList: UniqueKeyValues = {};
			initKeyValList[firstKeyValuesName] = firstKeyValue;

			addUniqueCombination(initKeyValList, keyValues);
		}

		return response;
	}

	/**
	 * Convert hrtime diff to milliseconds
	 *
	 * @param prevTime the output from process.hrtime() to diff to
	 * @param precision defaults to 2, must be an exact integer
	 * @return time diff in milliseconds rounded to given precision
	 */
	public hrtimeToMs(prevTime: [number, number], precision?: number): string {
		const diff = process.hrtime(prevTime);

		if (precision === undefined) {
			precision = 2;
		}

		return ((diff[0] * 1000) + (diff[1] / 1000000)).toFixed(precision);
	}

	public escapeRegExp(str: string): string {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
	}

	/**
	 * Formats an uuid string
	 *
	 * For example adds missing "-", trimming spaces etc
	 *
	 * @param uuidStr Can also take a buffer
	 * @return uuid string or false on failure
	 */
	public formatUuid(uuidStr: string | Buffer): string | boolean {

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
		let returnStr = '';
		returnStr = uuidStr.substring(0, 8);
		returnStr += '-' + uuidStr.substring(8, 12);
		returnStr += '-' + uuidStr.substring(12, 16);
		returnStr += '-' + uuidStr.substring(16, 20);
		returnStr += '-' + uuidStr.substring(20);

		return returnStr;
	}

	/**
	 * Replace all occurances of a string in a string and return the result
	 *
	 * @param search What to search for
	 * @param {string} replace What to replace it with
	 * @param {string} str The string to perform this to
	 * @return {string} The result
	 */
	public replaceAll(search: string, replace: string, str: string): string {
		return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
	}

	public async setTimeout(ms: number) {
		return new Promise(resolve => {
			setTimeout(() => resolve(), ms);
		});
	}

	/**
	 * Make a buffer from an uuid string
	 *
	 * @param uuidStr Can be with or without dashes, padded spaces etc will be trimmed
	 * @return or false on fail
	 */
	public uuidToBuffer(uuidStr: string): Buffer | boolean {
		const logPrefix = topLogPrefix + 'uuidToBuffer() - ';
		const { log } = this;

		if (typeof uuidStr !== 'string') {
			const stack = new Error().stack;
			log.warn(logPrefix + 'uuidStr is not a string, but a ' + (typeof uuidStr));
			log.verbose(logPrefix + stack);

			return false;
		}

		// Remove all but hex characters
		uuidStr = uuidStr.replace(/[^A-Fa-f0-9]/g, '');

		// All uuid strings have exactly 32 hex characters!
		if (uuidStr.length !== 32) {
			const stack = new Error().stack;
			log.warn(logPrefix + 'uuidStr should be exactly 32 characters after regex, but is: ' + uuidStr.length);
			log.verbose(logPrefix + stack);

			return false;
		}

		return Buffer.from(uuidStr, 'hex');
	}

	/**
	 * Check if input is an int
	 *
	 * @param value The value to check
	 * @return boolean
	 */
	public isInt(value: any): boolean {
		const x = parseFloat(value);

		if (isNaN(value)) {
			return false;
		}

		// tslint:disable-next-line:no-bitwise
		return (x | 0) === x;
	}

	private isLogInstance(logInstance: any): logInstance is LogInstance {
		if (typeof logInstance === 'object') {
			if (
				typeof logInstance.silly === 'function'
				&& typeof logInstance.debug === 'function'
				&& typeof logInstance.verbose === 'function'
				&& typeof logInstance.info === 'function'
				&& typeof logInstance.warn === 'function'
				&& typeof logInstance.error === 'function'
			) {
				return true;
			}
		}

		return false;
	}
}

export { Utils, Log, LogInstance, LogLevel };
