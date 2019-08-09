import Log from './log';

const topLogPrefix = 'larvitutils: src/index.ts: ';

interface LogInstance {
	silly(msg: string): void;
	debug(msg: string): void;
	verbose(msg: string): void;
	info(msg: string): void;
	warn(msg: string): void;
	error(msg: string): void;
}

interface UtilsOptions {
	log?: LogInstance;
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

export { Utils, Log };
