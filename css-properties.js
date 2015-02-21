_.each([
  { symbol: 'pct', cssSymbol: '%' },
  { symbol: 'ms', cssSymbol: 'ms' },
  { symbol: 'px', cssSymbol: 'px' },
  { symbol: 'em', cssSymbol: 'em' }],
  function (mapping) {
    css[mapping.symbol] = function (magnitude) {
      if (!(this instanceof css[mapping.symbol])) {
        return new css[mapping.symbol](magnitude);
      }
      this._magnitude = magnitude;
    };

    css[mapping.symbol].prototype.toString = function () {
      return this._magnitude + mapping.cssSymbol;
    };
  });

_.each(['marginLeft', 'inlineBlock', 'block', 'background', 'relative', 'pointer', 'hidden', 'uppercase', 'none', 'absolute', 'left', 'right', 'solid', 'bold', 'italic'],
  function (camelCasedProperty) {
    css[camelCasedProperty] = camelCaseToHyphenated(camelCasedProperty);
  });

Object.freeze(css);