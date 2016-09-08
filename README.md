# pattern-parser
## What is this?

A simple npm package to match strings based on a predefined set of patterns and route parsed arguments to callbacks. No other dependencies. You can use it to implement simple message-based interactions - at least that's what I intended it to do.

## How to install?

~~~sh
npm install pattern-parser --save
~~~

## How do I use it?

~~~
var parse = require('pattern-parser')
boolean parse(string message, array patterns[, function not_found, object context])
~~~
parser takes four arguments:
* a message to parse.
* an array of patterns.
* (optional) callback function that will be executed if no match is found. Original message is passed as an argument.
* (optional) an object to be passed as a context to all callbacks. For example, if you would put `{ id: 123 }` as a context, then every callback (including not_found) could access that parameter through `this.id`.

Parser will return a callback result if a match was found or false otherwise. Parser stops after the first match is found, so the order of patterns is important.

Here's how to write patterns:
~~~
var patterns = [
    {
        pattern: 'Your message pattern that can hold regular expressions and regex helpers (see below)',
        callback: function(arg1, arg2...)
        {
            // if the message is matched with this pattern, this function will be called with parsed arguments
        }
    }
];
~~~

You can use regular expressions in patterns. There are a few useful helpers to make writing patterns faster.

* {string} - matches whatever.
* {word} - matches exactly one word.
* {number} - matches any number (integer or float).
* {integer} - matches only integers.
* {float} - matches only numbers with floating point.

## Example
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

// what if no match is found?
parse('Order bazillion rolls of toilet paper', patterns, function(msg) { console.log('Sorry, could not understand what you meant by: ' + msg); });
~~~

## Can I modify it?

Do whatever you need to. You're gonna find some tests included.

## Found a bug?

File an issue in github issue tracker.