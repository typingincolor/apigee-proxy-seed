exports.searchAndReplaceFiles = function(env, grunt) {
  var config = {
    dev: {},
    tlrgsandbox: {},
    tlrgtest: {},
    tlrgprod: {},
    integration: {}
  };

  if (!config[env]) {
    grunt.fail.fatal('Environment ' + env + ' does not exist under grunt/search-and-replace-files.js');
  }

  return (config[env]);
};
