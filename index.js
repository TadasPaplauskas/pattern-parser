var parse = function(text, patterns, notFound, context)
{
    var pattern, callback, regex, args;
    for (var i = 0; i < patterns.length; i++)
    {
        pattern = patterns[i].pattern;
        callback = patterns[i].callback;

        if (!pattern || typeof pattern !== 'string' || !callback || typeof callback !== 'function')
        {
            throw ('pattern-parser: check your inputs. Patterns should be strings and callbacks should be functions.');
        }

        regex = pattern
                .replace(/{string}/gi, '(.*?)')
                .replace(/{number}/gi, '([-+]?[0-9]*\.?[0-9]+)')
                .replace(/{integer}/gi, '(\\d+)')
                .replace(/{float}/gi, '([-+]?[0-9]*\.[0-9]+)')
                .replace(/{word}/gi, '(\\w+)');

        args = text.match(new RegExp(regex, 'i'));

        if (args)
        {
            args = args.slice(1); // remove first element because it will be a full match

            var result = callback.apply(context, args);

            if (result === undefined) {
                return true;
            } else {
                return callback.apply(context, args);
            }
        }
    }
    // nothing was found
    if (notFound && typeof notFound === 'function')
    {
        notFound.call(context, text);
    }
    return false;
};

module.exports = parse;