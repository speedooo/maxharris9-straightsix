Tinytest.add('maxharris9:straightsix - test color features', function (test) {
  var red = css.color(1.0, 0.0, 0.0, 0.5);

  console.log("red.toHex:", red.toHex());
  console.log("red.toHex:", red.toString());
  test.equal(red.toHex(css.color(1.0, 1.0, 1.0, 1.0)), "#ff8080", "Expected #ff8080");
  test.equal(red.lighten(0.1).toHex(), "#ff8c8c", "Expected #ff8c8c");
  test.equal(red.darken(0.1).toHex(), "#f28080", "Expected #f28080");
});

Tinytest.add('maxharris9:straightsix - test style string generation', function (test) {
  var palette = {
    passive: css.color(0.897, 0.897, 0.897, 1.0),
    active: css.color(0.227, 0.529, 0.678, 1.0),
    demoForChris: css.color(0.227, 0.529, 0.678, 1.0).lighten(0.1), // lightens this color 10%
    background: css.color(1.0, 1.0, 1.0, 1.0),
    deactivated: css.color(0.6, 0.6, 0.6, 1.0)
  };

  var style = {
    general: css.merge( {
      border: [css.px(1), css.solid, palette.passive],
      position: css.relative,
      display: css.inlineBlock,
      height: css.em(2),
      width: css.em(5),
      background: palette.background,
      borderRadius: css.px(1000),
      cursor: css.pointer,
      overflow: css.hidden,
      marginTop: css.em(0.25),
      fontWeight: 600,
      textTransform: css.uppercase
    }, css.userSelect(css.none), { 'x': 'foo', 'y': 'bar' } ),
    switchBase: css.merge( {
      display: css.inlineBlock,
      height: css.pct(100),
      width: css.pct(40),
      borderRadius: css.pct(75),
    }, css.transition([css.marginLeft, 'cubic-bezier(0.34,1.61,0.7,1)', css.ms(250)])),
    open: {
      marginLeft: css.pct(60),
      background: palette.active
    },
    closed: {
      marginLeft: 0,
      background: palette.passive
    },
    switchLabelBase: {
      position: css.absolute,
      left: 0,
      top: 0,
      width: css.pct(100),
      lineHeight: css.em(1.85),
    },
    switchLabelOpen: {
      color: palette.active,
      paddingLeft: css.em(0.85),
      textAlign: css.left
    },
    switchLabelClosed: {
      color: palette.deactivated,
      paddingRight: css.em(0.65),
      textAlign: css.right
    }
  };

  var expectedResult = "border: 1px solid rgba(229,229,229,1);position:relative;display:inline-block;height:2em;width:5em;background:rgba(255,255,255,1);border-radius:1000px;cursor:pointer;overflow:hidden;margin-top:0.25em;font-weight:600;text-transform:uppercase;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;x:foo;y:bar;";
  test.equal(css.styleString(style.general), expectedResult, "Expected " + expectedResult);
});