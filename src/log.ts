type LogLevel = 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error' | 'none';

type LogOptions = {
	level: LogLevel | undefined;
};

type InternalLogOptions = {
	level: LogLevel;
};

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
		if (this.validLogLevels.includes(process.env.NODE_LOG_LVL || '')) {
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

export { Log, LogLevel, LogOptions };
