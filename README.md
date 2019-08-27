[![Build Status](https://travis-ci.org/larvit/larvitutils.svg)](https://travis-ci.org/larvit/larvitutils)
[![Dependencies](https://david-dm.org/larvit/larvitutils.svg)](https://david-dm.org/larvit/larvitutils.svg)
[![Coverage Status](https://coveralls.io/repos/github/larvit/larvitutils/badge.svg)](https://coveralls.io/github/larvit/larvitutils)

# larvitutils

Misc utilities

## Loading of library

The library takes one parameter as option, "log". It is designed to take an instance of [winston](https://github.com/winstonjs/winston), but more exactly it should be an object with the methods "silly", "debug", "verbose", "info", "warn" and "error". An example of this can be found in the VERY simplified logging utility built in to this library. See documentation below.

Example of loading the library with no configured logger (using the default):

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
```

Example of loading the library with an instance of [winston](https://github.com/winstonjs/winston) as logger:

```javascript
const winston = require('winston');
const log = winston.createLogger({ 'transports': [new winston.transprots.Console()] });
const { Utils } = require('larvitutils');
const utils = new Utils({ log });
```

## Changelog

Very summarized, see specific commits for more details

v3.2.0 - Added getUniqueCombinations()

v3.0.4 - Rewrite to TypeScript. Different initialization of the library (Log is no longer part of Utils). Log() now require exactly 'none' for no log output. Random strings will no longer be accepted.

v2.0.0 - Rewrite to all tings being instanciated

## Get unique combinations

Breaks up object with key-values to an array of all possible, unique key-values.

Example:

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();

console.log(utils.getUniqueCombinations({
	foo: ['bar', 'baz'],
	buu: ['lenny', 'bosse']
}));

/*
Outputs:
[
	{ "foo": "bar, "buu": "lenny" },
	{ "foo": "bar, "buu": "bosse" },
	{ "foo": "baz, "buu": "lenny" },
	{ "foo": "baz, "buu": "bosse" },
]
*/
```

## Async setTimeout

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
await utils.setTimeout(1000);
console.log('1000ms later');
```

## Convert a buffer to an Uuid

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
const uuid = utils.formatUuid(new Buffer('f9684592b24542fa88c69f16b9236ac3', 'hex'));

console.log(uuid); // f9684592-b245-42fa-88c6-9f16b9236ac3
```

Example usecase: fetch a binary column from a database and convert to a readable Uuid string

## Format a hex string to uuid

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
const uuid = utils.formatUuid(' f9684592b24542fa88c69f16b9236ac3'); // Notice the starting space getting trimmed away

console.log(uuid); // f9684592-b245-42fa-88c6-9f16b9236ac3
```

## hrtimeToMs()

Used to convert hrtime() calls to milliseconds, since hrtime() output is messy (seconrds + nanoseconrds)

Usage:

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
const startTime = process.hrtime();

setTimeout(function() {
	console.log('benchmark took %d ms', utils.hrtimeToMs(startTime, 4));
 // benchmark took 34.0005 ms
}, 34);
```

## Uuid string to buffer

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
const uuidStr = 'f9684592-b245-42fa-88c6-9f16b9236ac3';

utils.uuidToBuffer(uuidStr); // Will return a buffer or false on failure
```

## Replace all for strings

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
const str = 'f9684592-b245-42fa-88c6-9f16b9236ac3';

utils.replaceAll('-', '_', str); // f9684592_b245_42fa_88c6_9f16b9236ac3
```

## Validate an uuid string

```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();
const validUuid = 'f9684592-b245-42fa-88c6-9f16b9236ac3';
const invalidUuid1 = false;
const invalidUuid2 = 'foobar';
const invalidUuid3 = {höhö: 'oveboll'};

utils.formatUuid(validUuid); // true
utils.formatUuid(invalidUuid1); // false
utils.formatUuid(invalidUuid2); // false
utils.formatUuid(invalidUuid3); // false
```

## Check if input is an int
```javascript
const { Utils } = require('larvitutils');
const utils = new Utils();

utils.isInt(10); // true
utils.isInt(10.0); // true
utils.isInt(10.5); // false
utils.isInt('oveboll'); // false
```

## Simple logger

This is ment as a very simple replacement for winston

```javascript
const { Log } = require('larvitutils');
const log = new Log();

log.info('Hello'); // prints to stdout "2018-08-08T20:02:34Z [inf] Hello
log.error('Hello'); // prints to stderr "2018-08-08T20:02:48Z [err] Hello
```

By default only info, warn and error are printed to screen. Set minimum level by string, like this:

```javascript
const { Log } = require('larvitutils');
const log = new Log('debug');

log.debug('Hello'); // prints to stdout "2018-08-08T20:02:34Z [deb] Debug
```

Or disable output entirely

```javascript
const { Log } = require('larvitutils');
const log = new Log('none');

log.error('Hello'); // prints nothing
```

The default log level can be changed by setting environment variable NODE_LOG_LVL

All logging methods: silly, debug, verbose, info, warn and error.
