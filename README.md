#straightsix#

This package attempts to facilitate expressing CSS in JavaScript. Inspired by https://speakerdeck.com/vjeux/react-css-in-js

This is an experiment - one of the goals here is to figure out if this is a really good idea or not.

XXX: right now, if you attempt to use an unknown property, it'll just substitute undefined, and no warning will be triggered

    e.g., fontWeight: css.gold => font-weight: undefined

when support for es6 proxy (which, among other things, allow you to specify get and set handlers) lands in desktop browsers,
it will be easy to fix! until then, here are your alternatives:

1. just jam in the string you want to see in the DOM:
    e.g., fontWeight: 'gold'
pro: works okay, good to have this around as a last resort
con: no error checking

2. implement clunky getters (which is worse than just using the string)
    e.g., fontWeight: css.get('gold')
pro: error checking
con: too much typing

3. implement each constant as a method
    e.g., fontWeight: css.gold()
pro: error checking
con: parens are still noise

XXX: CSS parser?
    var style = css.parse('someExistingCss');

##To-do##
- replace the camelcase -> hyphenated string regex with a nice, tight loop
- better error checking (see above)
- add support for more CSS properties
- add features
- add more tests