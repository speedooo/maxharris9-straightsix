getSpecialCases = function () {
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

  return specialCases;
};