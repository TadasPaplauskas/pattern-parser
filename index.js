var parse = function(text, patterns)
{
    var pattern, callback, regex, args;
    for (var i = 0; i < patterns.length; i++)
    {
        pattern = patterns[i].pattern;
        callback = patterns[i].callback;

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
            callback.apply(null, args);
            return true;
        }
    }
    return false;
};

module.exports = parse;