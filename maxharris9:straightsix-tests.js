Tinytest.add('maxharris9:straightsix - test color features', function (test) {
  var red = css.color(1.0, 0.0, 0.0, 0.5);

  console.log("red.toHex:", red.toHex());
  console.log("red.toHex:", red.toString());
  test.equal(red.toHex(css.color(1.0, 1.0, 1.0, 1.0)), "#ff8080", "Expected #ff8080");
  test.equal(red.lighten(0.1).toHex(), "#ff8c8c", "Expected #ff8c8c");
  test.equal(red.darken(0.1).toHex(), "#f28080", "Expected #f28080");
});