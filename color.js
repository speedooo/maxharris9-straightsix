css.color = function (red, blue, green, alpha) {
  if (!(this instanceof css.color)){
    return new css.color(red, blue, green, alpha);
  }
  this._color = [red, blue, green, alpha];
};

css.color.prototype._add = function (scalar) {
  return css.color(
    clamp(this._color[0] + scalar, 0, 1),
    clamp(this._color[1] + scalar, 0, 1),
    clamp(this._color[2] + scalar, 0, 1),
    this._color[3]);  
};

css.color.prototype._eightBits = function (index) {
  return this._color[index] * 255; // we're assuming the index is valid!
};

css.color.prototype.darken = function (scalar) {
  return this._add(scalar * -1);
};

css.color.prototype.lighten = function (scalar) {
  return this._add(scalar);
};

css.color.prototype.toString = function () {
  return 'rgba(' +
    this._eightBits(0).toFixed() + ',' +
    this._eightBits(1).toFixed() + ',' +
    this._eightBits(2).toFixed() + ',' +
    this._color[3] + ')';
};

css.color.prototype.toHex = function (backgroundColor) {
  // there is no alpha channel in a hex color, so we have to calculate the composite value using the background color
  // unless you want this compositing behavior for some reason, it's probably better to just use the toString method instead

  var alpha = this._color[3];
  var bg = backgroundColor || css.color(1.0, 1.0, 1.0, 1.0);

  var rgb =
    (((1 - alpha) * bg._color[2] + alpha * (this._eightBits(2) + 255) )) |
    (((1 - alpha) * bg._color[1] + alpha * (this._eightBits(1) + 255) )) << 8 |
    (((1 - alpha) * bg._color[0] + alpha * (this._eightBits(0) + 255) )) << 16;

  return '#' + (0x1000000 + rgb).toString(16).slice(1);
};