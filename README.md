[![Build Status](https://travis-ci.org/larvit/larvitutils.svg)](https://travis-ci.org/larvit/larvitutils) [![Dependencies](https://david-dm.org/larvit/larvitutils.svg)](https://david-dm.org/larvit/larvitutils.svg)

# larvitutils

Misc utilities

## Loading of library

The library takes one parameter as option, "log". It is designed to take an instance of [winston](https://github.com/winstonjs/winston), but more exactly it should be an object with the methods "silly", "debug", "verbose", "info", "warn" and "error". An example of this can be found in the VERY simplified logging utility built in to this library. See documentation below.

Example of loading the library with no configured logger (using the default):

```javascript
const	utils	= new (require('larvitutils'))();
```

Example of loading the library with an instance of [winston](https://github.com/winstonjs/winston) as logger:

```javascript
const	winston	= require('winston'),
	log	= winston.createLogger({'transports':[new winston.transprots.Console()]}),
	utils	= new (require('larvitutils'))({'log': log});
```

## Convert a buffer to an Uuid

```javascript
const	utils	= new (require('larvitutils'))(),
	uuid	= utils.formatUuid(new Buffer('f9684592b24542fa88c69f16b9236ac3', 'hex'));

console.log(uuid); // f9684592-b245-42fa-88c6-9f16b9236ac3
```

Example usecase: fetch a binary column from a database and convert to a readable Uuid string

## Format a hex string to uuid

```javascript
const	utils	= new (require('larvitutils'))(),
	uuid	= utils.formatUuid(' f9684592b24542fa88c69f16b9236ac3'); // Notice the starting space getting trimmed away

console.log(uuid); // f9684592-b245-42fa-88c6-9f16b9236ac3
```

## hrtimeToMs()

Used to convert hrtime() calls to milliseconds, since hrtime() output is messy (seconrds + nanoseconrds)

Usage:

```javascript
const	utils	= new (require('larvitutils'))(),
	startTime	= process.hrtime();

setTimeout(function() {
	console.log('benchmark took %d ms', utils.hrtimeToMs(startTime, 4));
	// benchmark took 34.0005 ms
}, 34);
```

## Uuid string to buffer

```javascript
const	utils	= new (require('larvitutils'))(),
	uuidStr	= 'f9684592-b245-42fa-88c6-9f16b9236ac3';

utils.uuidToBuffer(uuidStr); // Will return a buffer or false on failure
```

## Replace all for strings

```javascript
const	utils	= new (require('larvitutils'))(),
	str	= 'f9684592-b245-42fa-88c6-9f16b9236ac3';

utils.replaceAll('-', '_', str); // f9684592_b245_42fa_88c6_9f16b9236ac3
```

## Validate an uuid string

```javascript
const	utils	= new (require('larvitutils'))(),
	validUuid	= 'f9684592-b245-42fa-88c6-9f16b9236ac3',
	invalidUuid1	= false,
	invalidUuid2	= 'foobar',
	invalidUuid3	= {'höhö': 'oveboll'};

utils.formatUuid(validUuid);	// true
utils.formatUuid(invalidUuid1);	// false
utils.formatUuid(invalidUuid2);	// false
utils.formatUuid(invalidUuid3);	// false
```

## Check if input is an int
```javascript
const	utils	= new (require('larvitutils'))();

utils.isInt(10); // true
utils.isInt(10.0); // true
utils.isInt(10.5); // false
utils.isInt('oveboll'); // false
```

## Simple logger

This is ment as a very simple replacement for winston

```javascript
const	utils	= new (require('larvitutils'))(),
	log	= new utils.Log();

log.info('Hello'); // prints to stdout "2018-08-08T20:02:34Z [inf] Hello
log.error('Hello'); // prints to stderr "2018-08-08T20:02:48Z [err] Hello
```

By default only info, warn and error are printed to screen. Set minimum level by string, like this:

```javascript
const	utils	= new (require('larvitutils'))(),
	log	= new utils.Log('debug');

log.debug('Hello'); // prints to stdout "2018-08-08T20:02:34Z [deb] Debug
```

Or disable output entirely

```javascript
const	utils	= new (require('larvitutils'))(),
	log	= new utils.Log('none');

log.error('Hello'); // prints nothing
```



All logging methods: silly, debug, verbose, info, warn and error.
