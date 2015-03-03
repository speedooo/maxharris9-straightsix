var checkUpperCase = function (input) {
  var charCode = input.charCodeAt(0);
  return (charCode >= 65 && charCode <= 90);
};

camelCaseToHyphenated = function (camelCasedString) {
  var lastSplitLocation = 0;
  var result = '';
  var stringLength = camelCasedString.length;
  var lowerCasedString = camelCasedString.toLowerCase();
  for (var i = 0; i < stringLength; i++) {
    if (checkUpperCase(camelCasedString[i])) {
      result += lowerCasedString.substring(lastSplitLocation, i) + '-';
      lastSplitLocation = i;
    }
    if (i === stringLength - 1) {
      result += lowerCasedString.substring(lastSplitLocation, i + 1);
    }
  }

  return result;
};

/*
camelCaseToHyphenatedRegEx = function (camelCasedString) {
  return camelCasedString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

camelCaseToHyphenatedNaive = function (camelCasedString) {
  var result = '';
  var lowerCasedString = camelCasedString.toLowerCase();
  for (var i = 0; i < camelCasedString.length; i++) {
    if (checkUpperCase(camelCasedString[i])) {
      result += '-';
    }
    result += lowerCasedString[i];
  }

  return result;
};

camelCaseToHyphenatedArrayJoin = function (camelCasedString) {
  var tokens = [];
  var lastSplitLocation = 0;
  var stringLength = camelCasedString.length;
  var lowerCasedString = camelCasedString.toLowerCase();

  for (var i = 0; i < stringLength; i++) {
    if (checkUpperCase(camelCasedString[i])) {
      tokens.push(lowerCasedString.substring(lastSplitLocation, i));
      lastSplitLocation = i;
    }
    if (i === stringLength - 1) {
      tokens.push(lowerCasedString.substring(lastSplitLocation, i + 1));
    }
  }

  return tokens.join('-');
};

// this is not a good approach to checking anyway
bakeOff();

function bakeOff () {
  var runTest = function (testName, iterations, testFunction, testString) {
    console.time(testName);
    for (var m = 0; m < iterations; m++) {
      testFunction(testString);
    }
    console.timeEnd(testName);
    console.log('testing ' + testName + ', result: ' + testFunction(testString));
    console.log('==============');
  };

  var iterations = 10000;

  runTest('camelCaseToHyphenatedNaive', iterations, camelCaseToHyphenatedNaive, "borderRadiusMonkeyButter");
  runTest('camelCaseToHyphenatedRegEx', iterations, camelCaseToHyphenatedRegEx, "borderRadiusMonkeyButter");
  runTest('camelCaseToHyphenatedArrayJoin', iterations, camelCaseToHyphenatedArrayJoin, "borderRadiusMonkeyButter");
  runTest('camelCaseToHyphenated', iterations, camelCaseToHyphenated, "borderRadiusMonkeyButter");
}
*/