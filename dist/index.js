"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.Utils = void 0;
const topLogPrefix = 'larvitutils: src/index.ts: ';
class Log {
    /**
     * Simple logging instance
     *
     * @param options[=process.env.NODE_LOG_LVL] - Optional options object or minimum log level
     * @param options.level[=process.env.NODE_LOG_LVL] - log level
     */
    constructor(options) {
        this.validLogLevels = ['silly', 'debug', 'verbose', 'info', 'warn', 'error', 'none'];
        const defaultLogLevel = this.getDefaultLogLevel();
        if (this.isLogLevel(options)) {
            this.options = { level: options };
        }
        else if (this.optionsIsLogOptions(options)) {
            if (!this.isLogLevel(options.level)) {
                this.options = { level: defaultLogLevel };
            }
            else {
                this.options = { level: options.level };
            }
        }
        else {
            this.options = { level: defaultLogLevel };
        }
    }
    stdout(lvl, msg) {
        // tslint:disable-next-line:no-console
        console.log((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
    }
    stderr(lvl, msg) {
        // tslint:disable-next-line:no-console
        console.error((new Date()).toISOString().substring(0, 19) + 'Z [' + lvl + '] ' + msg);
    }
    silly(msg) {
        if (this.options.level === 'silly') {
            this.stdout('\x1b[1;37msil\x1b[0m', msg);
        }
    }
    debug(msg) {
        if (['silly', 'debug'].includes(this.options.level)) {
            this.stdout('\x1b[1;35mdeb\x1b[0m', msg);
        }
    }
    verbose(msg) {
        if (['silly', 'debug', 'verbose'].includes(this.options.level)) {
            this.stdout('\x1b[1;34mver\x1b[0m', msg);
        }
    }
    info(msg) {
        if (['silly', 'debug', 'verbose', 'info'].includes(this.options.level)) {
            this.stdout('\x1b[1;32minf\x1b[0m', msg);
        }
    }
    warn(msg) {
        if (['silly', 'debug', 'verbose', 'info', 'warn'].includes(this.options.level)) {
            this.stderr('\x1b[1;33mwar\x1b[0m', msg);
        }
    }
    error(msg) {
        if (['silly', 'debug', 'verbose', 'info', 'warn', 'error'].includes(this.options.level)) {
            this.stderr('\x1b[1;31merr\x1b[0m', msg);
        }
    }
    getDefaultLogLevel() {
        if (typeof process === 'undefined' || !process || !process.env || !process.env.NODE_LOG_LVL) {
            return 'info';
        }
        else if (this.validLogLevels.includes(process.env.NODE_LOG_LVL || '')) {
            return process.env.NODE_LOG_LVL;
        }
        else {
            return 'info';
        }
    }
    optionsIsLogOptions(options) {
        if (options === undefined || typeof options !== 'object') {
            return false;
        }
        else {
            return true;
        }
    }
    isLogLevel(options) {
        if (options === undefined) {
            return false;
        }
        for (let i = 0; this.validLogLevels.length !== i; i++) {
            if (this.validLogLevels[i] === options) {
                return true;
            }
        }
        return false;
    }
}
exports.Log = Log;
class Utils {
    constructor(options) {
        this.Log = Log;
        this.options = options || {};
        if (this.isLogInstance(this.options.log)) {
            this.log = this.options.log;
        }
        else {
            this.log = this.options.log = new Log();
        }
    }
    getUniqueCombinations(keyValues) {
        const response = [];
        function addUniqueCombination(curKeyVals, subKeyValues) {
            const workSubKeyValuesName = Object.keys(subKeyValues)[Object.keys(curKeyVals).length];
            const workSubKeyValues = subKeyValues[workSubKeyValuesName];
            // If this is the last key val to look for, loop through them all, add them and return them
            if (Object.keys(curKeyVals).length === Object.keys(subKeyValues).length) {
                response.push(curKeyVals);
                // Loop through next key in line
            }
            else {
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
            const initKeyValList = {};
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
    hrtimeToMs(prevTime, precision) {
        const diff = process.hrtime(prevTime);
        if (precision === undefined) {
            precision = 2;
        }
        return ((diff[0] * 1000) + (diff[1] / 1000000)).toFixed(precision);
    }
    escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    }
    /**
     * Formats an uuid string
     *
     * For example adds missing "-", trimming spaces etc
     *
     * @param uuidStr Can also take a buffer
     * @return uuid string or false on failure
     */
    formatUuid(uuidStr) {
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
    replaceAll(search, replace, str) {
        return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
    }
    async setTimeout(ms) {
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
    uuidToBuffer(uuidStr) {
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
    isInt(value) {
        const x = parseFloat(value);
        if (isNaN(value)) {
            return false;
        }
        return (x | 0) === x;
    }
    isLogInstance(logInstance) {
        if (typeof logInstance === 'object') {
            if (typeof logInstance.silly === 'function'
                && typeof logInstance.debug === 'function'
                && typeof logInstance.verbose === 'function'
                && typeof logInstance.info === 'function'
                && typeof logInstance.warn === 'function'
                && typeof logInstance.error === 'function') {
                return true;
            }
        }
        return false;
    }
}
exports.Utils = Utils;
