type InternalLogOptions = {
	level: LogLevel;
};

type KeyValues = {
	[key: string]: string[];
};

type LogInstance = {
	silly(msg: string): void;
	debug(msg: string): void;
	verbose(msg: string): void;
	info(msg: string): void;
	warn(msg: string): void;
	error(msg: string): void;
};

type LogLevel = 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error' | 'none';

type LogOptions = {
	level: LogLevel | undefined;
};

type UniqueKeyValues = {
	[key: string]: string;
};

type UtilsOptions = {
	log?: LogInstance;
};

export { InternalLogOptions, KeyValues, LogInstance, LogLevel, LogOptions, UniqueKeyValues, UtilsOptions };
