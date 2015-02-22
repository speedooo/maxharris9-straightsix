Package.describe({
  summary: "Inline styles component for Meteor",
  version: "1.0.1",
  git: "https://github.com/max-leportlabs/maxharris9-straightsix.git",
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0.3');
  api.use(['underscore', 'maxharris9:template-instance-utils@1.0.3', 'maxharris9:hashmap@1.0.1'], 'client');

  api.addFiles('straightsix.js', 'client'); // call this before the other addFiles calls
  api.addFiles('color.js', 'client');
  api.addFiles('mixins.js', 'client');
  api.addFiles('css-properties.js', 'client'); // call this last because there's an Object.freeze at the end
  api.export(['css'], 'client');
});

Package.onTest(function(api) {
  api.use(['maxharris9:straightsix', 'tinytest', 'test-helpers']);
  api.addFiles('maxharris9:straightsix-tests.js', 'client');
});
