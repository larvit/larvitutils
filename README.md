# larvitutils

Misc utilities

## hrtimeToMs()

Used to convert hrtime() calls to milliseconds, since hrtime() output is messy (seconrds + nanoseconrds)

Usage:

    var utils     = require('larvitutils'),
        startTime = process.hrtime();

    setTimeout(function() {
      console.log('benchmark took %d ms', utils.hrtimeToMs(startTime, 4));
      // benchmark took 34.0005 ms
    }, 34);