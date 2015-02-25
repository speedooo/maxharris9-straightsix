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

css.color.prototype.toHsv = function () {
  var degrees = function (scalar) {
    return (scalar * 60) % 360;
  };

  var getHue = function (r, g, b, cmax, delta) {
    if (cmax === g) {
      return degrees(((b - r)/delta) + 2);
    }
    if (cmax === b) {
      return degrees(((r - g)/delta) + 4);
    }
    if (cmax === r) {
      return degrees(((g - b)/delta) % 6);
    }
  };

  var cmax = Math.max(this._color[0], this._color[1], this._color[2]);
  var cmin = Math.min(this._color[0], this._color[1], this._color[2]);

  var delta = cmax - cmin;

  var h = (delta > 0) ? getHue(this._color[0], this._color[1], this._color[2], cmax, delta) : 0;
  var s = (cmax === 0) ? 0 : delta / cmax;

  return [h, s, cmax]; // cmax is equal to 'value'
};

css.color.prototype.fromHsv = function (h, s, v) { // translated from C implementation at http://www.cs.rit.edu/~ncs/color/t_convert.html
  if (s === 0) { // achromatic (grey)
    return [v, v, v]; // [r, g, b]
  }

  var hPrime = h / 60; // sector 0 to 5
  var i = Math.floor(hPrime);
  var f = hPrime - i; // factorial part of h
  var p = v * (1 - s);
  var q = v * (1 - s * f);
  var t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    default: // case 5
      return [v, p, q];
  }
};

css.color.prototype._modifySaturation = function (scalar) {
  var hsl = this.toHsv();
  var rgb = this.fromHsv(hsl[0], hsl[1] + scalar, hsl[2]);

  console.log('rgb:', rgb);

  return css.color(rgb[0], rgb[1], rgb[2], this._color[3]);
};

css.color.prototype.desaturate = function (scalar) {
  return this._modifySaturation(scalar * -1);
};

css.color.prototype.saturate = function (scalar) {
  return this._modifySaturation(scalar);
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