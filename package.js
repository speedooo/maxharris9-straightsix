Package.describe({
  summary: "Inline styles component for Meteor",
  version: "1.0.0",
  git: "https://github.com/maxharris9/maxharris9-straightsix.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0.3');
  api.use(['underscore', 'maxharris9:template-instance-utils', 'maxharris9:hashmap'], 'client');

  api.addFiles('straightsix.js', 'client'); // call this before the other addFiles calls
  api.addFiles('color.js', 'client');
  api.addFiles('css-properties.js', 'client');
  api.export(['css'], 'client');
});

Package.onTest(function(api) {
  api.use(['maxharris9:straightsix', 'tinytest', 'test-helpers']);
  api.addFiles('maxharris9:straightsix-tests.js', 'client');
});