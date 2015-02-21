// inspired by https://speakerdeck.com/vjeux/react-css-in-js
//
// XXX: right now, if you attempt to use an unknown property, it'll just substitute undefined, and no warning will be triggered
//   e.g., fontWeight: css.gold => font-weight: undefined
// when support for es6 proxy (which, among other things, allow you to specify get and set handlers) lands in desktop browsers,
// it will be easy to  will be easy to fix! until then, here are your alternatives:
//
// just jam in the string you want to see in the DOM:
//   e.g., fontWeight: 'gold'
// pro: works okay, good to have this around as a last resort
// con: no error checking
//
// implement clunky getters (which is worse than just using the string)
//   e.g., fontWeight: css.get('gold')
// pro: error checking
// con: too much typing
//
// implement each constant as a method
//   e.g., fontWeight: css.gold()
// pro: error checking
// con: parens are still noise
//
// XXX: CSS parser?
//   var style = css.parse('someExistingCss');

css = {};

// XXX: put this in a nicer place
var specialCases = new HashMap1d();
specialCases.addItem('webkitUserSelect', '-webkit-user-select');
specialCases.addItem('msUserSelect', '-ms-user-select');
specialCases.addItem('mozUserSelect', '-moz-user-select');
specialCases.addItem('oUserSelect', '-o-user-select');
specialCases.addItem('webkitTransition', '-webkit-transition');
specialCases.addItem('mozTransition', '-moz-transition');

specialCases.addItem('webkitMarginBefore', '-webkit-margin-before');
specialCases.addItem('webkitMarginAfter', '-webkit-margin-after');
specialCases.addItem('webkitMarginStart', '-webkit-margin-start');
specialCases.addItem('webkitMarginEnd', '-webkit-margin-end');

css.styleString = function (styleObject) {
  var result = '';

  for (var property in styleObject) {
    var cssPropertyResult = specialCases.getItem(property);
    var hyphenatedProperty = ("undefined" === typeof cssPropertyResult) ? camelCaseToHyphenated(property) : cssPropertyResult;

    if (Array.isArray(styleObject[property])) {
      var compoundStyle = '';
      for (var x = 0; x < styleObject[property].length; x++) { // iterating manually keeps us from smacking into __proto__
        compoundStyle += ' ' + styleObject[property][x].toString();
      }

      result += hyphenatedProperty + ':' + compoundStyle + ';';
    }
    else {
      if ("undefined" === typeof styleObject[property]) {
        // XXX: arg! why hasn't es6 landed already? none of the es6 transpilers or polyfills support Proxy - this has to be done in the vm
        console.error('value for property ' + property + ' not found', styleObject);
        console.error('  please add it to maxharris9:straightsix/css-properties.js');
      }
      else {
        result += hyphenatedProperty + ':' + styleObject[property].toString() + ';';
      }
    }
  }

  return result;
}

css.merge = function (baseObject, newObject) {
  return _.extend({ }, baseObject, newObject);
}

clamp = function (number, min, max) {
  return Math.min(Math.max(number, min), max);
};

camelCaseToHyphenated = function (camelCasedString) {
  return camelCasedString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); // XXX: replace with something less expensive
};