css = {};

var specialCases = getSpecialCases();

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

// XXX: polyfill just lazily grabbed up, without tests, from https://github.com/sindresorhus/object-assign
function ToObject(val) {
  if (val == null) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

var objectAssign = Object.assign || function (target, source) {
  var from;
  var keys;
  var to = ToObject(target);

  for (var s = 1; s < arguments.length; s++) {
    from = arguments[s];
    keys = Object.keys(Object(from));

    for (var i = 0; i < keys.length; i++) {
      to[keys[i]] = from[keys[i]];
    }
  }

  return to;
};
// XXX: end lifted polyfill

// lifted almost verbatim from Christopher Chedeau's presentation
css.merge = function () {
  var res = {};
  for (var i = 0; i < arguments.length; ++i) {
    if (arguments[i]) {
      objectAssign(res, arguments[i]);
    }
  }
  return res;
};

clamp = function (number, min, max) {
  return Math.min(Math.max(number, min), max);
};

camelCaseToHyphenated = function (camelCasedString) {
  return camelCasedString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); // XXX: replace with something less expensive
};