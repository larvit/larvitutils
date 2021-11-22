/// <reference types="node" />
import { KeyValues, LogInstance, LogLevel, LogOptions, UniqueKeyValues, UtilsOptions } from './models';
declare class Log {
    private readonly validLogLevels;
    private options;
    /**
     * Simple logging instance
     *
     * @param options[=process.env.NODE_LOG_LVL] - Optional options object or minimum log level
     * @param options.level[=process.env.NODE_LOG_LVL] - log level
     */
    constructor(options?: LogOptions | LogLevel);
    stdout(lvl: string, msg: string): void;
    stderr(lvl: string, msg: string): void;
    silly(msg: string): void;
    debug(msg: string): void;
    verbose(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    private getDefaultLogLevel;
    private optionsIsLogOptions;
    private isLogLevel;
}
declare class Utils {
    Log: any;
    private options;
    private log;
    constructor(options?: UtilsOptions);
    getUniqueCombinations(keyValues: KeyValues): UniqueKeyValues[];
    /**
     * Convert hrtime diff to milliseconds
     *
     * @param prevTime the output from process.hrtime() to diff to
     * @param precision defaults to 2, must be an exact integer
     * @return time diff in milliseconds rounded to given precision
     */
    hrtimeToMs(prevTime: [number, number], precision?: number): string;
    escapeRegExp(str: string): string;
    /**
     * Formats an uuid string
     *
     * For example adds missing "-", trimming spaces etc
     *
     * @param uuidStr Can also take a buffer
     * @return uuid string or false on failure
     */
    formatUuid(uuidStr: string | Buffer): string | boolean;
    /**
     * Replace all occurances of a string in a string and return the result
     *
     * @param search What to search for
     * @param {string} replace What to replace it with
     * @param {string} str The string to perform this to
     * @return {string} The result
     */
    replaceAll(search: string, replace: string, str: string): string;
    setTimeout(ms: number): Promise<void>;
    /**
     * Make a buffer from an uuid string
     *
     * @param uuidStr Can be with or without dashes, padded spaces etc will be trimmed
     * @return or false on fail
     */
    uuidToBuffer(uuidStr: string): Buffer | boolean;
    /**
     * Check if input is an int
     *
     * @param value The value to check
     * @return boolean
     */
    isInt(value: any): boolean;
    private isLogInstance;
}
export { Utils, Log, LogInstance, LogLevel };
