[![Build Status](https://travis-ci.org/larvit/larvitutils.svg)](https://travis-ci.org/larvit/larvitutils)

# larvitutils

Misc utilities

## Convert a buffer to an Uuid

```javascript
var utils = require('larvitutils'),
    uuid  = utils.formatUuid(new Buffer('f9684592b24542fa88c69f16b9236ac3', 'hex'));

console.log(uuid); // f9684592-b245-42fa-88c6-9f16b9236ac3
```

Example usecase: fetch a binary column from a database and convert to a readable Uuid string

## Format a hex string to uuid

```javascript
var utils = require('larvitutils'),
    uuid  = utils.formatUuid(' f9684592b24542fa88c69f16b9236ac3'); // Notice the starting space getting trimmed away

console.log(uuid); // f9684592-b245-42fa-88c6-9f16b9236ac3
```

## hrtimeToMs()

Used to convert hrtime() calls to milliseconds, since hrtime() output is messy (seconrds + nanoseconrds)

Usage:

```javascript
var utils     = require('larvitutils'),
    startTime = process.hrtime();

setTimeout(function() {
	console.log('benchmark took %d ms', utils.hrtimeToMs(startTime, 4));
	// benchmark took 34.0005 ms
}, 34);

## Uuid string to buffer

```javascript
var utils   = require('larvitutils'),
    uuidStr = 'f9684592-b245-42fa-88c6-9f16b9236ac3';

utils.uuidToBuffer(uuidStr); // Will return a buffer
```

More to come...
