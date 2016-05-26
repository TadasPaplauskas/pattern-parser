pattern-parser
==============================
## What is this?

A simple npm package to parse strings based on predefined patterns and route matched arguments to callbacks. No other dependencies.

I developed it to use for a simple bot interactions, but there are more applications to this.

## How to install?

```sh
npm install pattern-parser
```

## How do I use it?

~~~
var parse = require('pattern-parser');

// an array of patterns to match to, callbacks included
var patterns = [
    {
        pattern: 'Order {integer} rolls of toilet paper',
        callback: function (rolls)
        {
            console.log('I will order ' + rolls + ' of toilet paper');
        }
    },
    {
        pattern: 'Remind me to {string} tomorrow',
        callback: function (reminder)
        {
            console.log('I will remind you to ' + reminder + ' tomorrow at noon');
        }
    }
];

// a message you want to parse
var message = 'Remind me to pay the taxes tomorrow';

// parser stops after the first match is found, so the order of patterns is important.
// matching is case-insensitive
parse(message, patterns);
~~~

### Regular expressions helpers

You can use regular expressions in your patterns, but there are some quick helpers to make writing patterns faster.

* {string} - matches whatever.
* {word} - matches exactly one word.
* {number} - matches any number (integer or float).
* {integer} - matches only integers.
* {float} - matches only numbers with floating point.


## Can I modify it?

By all means, do whatever you need to. You're gonna find mocha tests included to make sure you are not breaking anything.

## Found a bug?

File an issue in github issue tracker.