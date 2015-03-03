var ruleHashes = new HashMap1d();

css.registerStyleClass = function (styleString) {
  var key = 'css-' + sha1(styleString);
  var result = ruleHashes.getItem(key);

  if (!result) {
    ruleHashes.addItem(key, styleString);
    addCss('.' + key, styleString);
  }

  return key;
};

css.registerClass = function (styleObject) {
  return css.registerStyleClass(css.styleString(styleObject));
};

function getStyleTag(tagName, headElement) {
  var styleElements = document.getElementsByTagName(tagName);

  // XXX: clean this up
  if (0 === styleElements.length) {
    var styleElement = document.createElement(tagName);
    styleElement.type = 'text/css';
    styleElement.media = 'screen';
    headElement.appendChild(styleElement);

    return styleElement;
  }
  else {
    return styleElements[0];
  }
}

function addCss(selector, styleString) {
  var headElement = document.getElementsByTagName('head')[0];
  if (headElement) {
    var styleElement = getStyleTag('style', headElement);
    styleElement.appendChild(document.createTextNode(selector + '{' + styleString + '}'));
  }
}