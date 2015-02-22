css.userSelect = function (value) {
  // XXX: check for invalid values
  return {
    webkitUserSelect: value,
    msUserSelect: value,
    mozUserSelect: value,
    oUserSelect: value,
    userSelect: value
  };
};

css.transition = function (value) {
  // XXX: check for invalid values
  return {
    webkitTransition: value,
    mozTransition: value,
    transition: value
  };
};