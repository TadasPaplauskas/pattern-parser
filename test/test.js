// nodemon -x "npm test"

var assert = require('assert');
var parse = require('../index');
var noMatch = 'Test text did not match a pattern';

describe('Parse expressions:', function () {
    it('parses string', function () {
        assert.ok(
            parse('Remind me to pay the taxes tomorrow', [{
                pattern: 'Remind me to {string} tomorrow',
                callback: function (str)
                {
                    assert.equal(str, 'pay the taxes');
                }
            }]), noMatch);
    });

    it('parses word', function () {
        assert.ok(
            parse('One of my dogs was named Dolly, and she was the best.', [{
                pattern: 'One of my dogs was named {word}, and she was the best.',
                callback: function (str)
                {
                    assert.equal(str, 'Dolly');
                }
            }]), noMatch);
    });

    it('parses number', function () {
        assert.ok(
            parse('I have 1.5 reasons to care and 0 fucks to give.', [{
                pattern: 'I have {number} reasons to care and {number} fucks to give.',
                callback: function (nr1, nr2)
                {
                    assert.equal(nr1, 1.5);
                    assert.equal(nr2, 0);
                }
            }]), noMatch);
    });

    it('parses integer', function () {

        // this one should not find a match and return false, integer should not let the float pass
        assert(!
            parse('If I divided 5 by 2 I would get 2.5, right?', [{
                pattern: 'If I divided {integer} by {integer} I would get {integer}, right?',
                callback: function () {}
            }]));

        assert.ok(
            parse('If I divided 4 by 2 I would get 2, right?', [{
                pattern: 'If I divided {integer} by {integer} I would get {integer}, right?',
                callback: function (int1, int2, int3)
                {
                    assert.equal(int1, 4);
                    assert.equal(int2, 2);
                    assert.equal(int3, 2);
                }
            }]), noMatch);
    });

    it('parses float', function () {
        assert(!
            parse('I have 2 hands and 1.5 legs.', [{
                pattern: 'I have {float} hands and {float} legs.',
                callback: function () {}
            }]));

        assert.ok(
            parse('I have 2.5 brain cells and thats 1.5 too much.', [{
                pattern: 'I have {float} brain cells and thats {float} too much.',
                callback: function (float1, float2)
                {
                    assert.equal(float1, 2.5);
                    assert.equal(float2, 1.5);

                }
            }]), noMatch);
    });

});
