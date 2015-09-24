var profile = function(environment, grunt) {
  var profile = {};
  profile.apiproxy = 'sample';
  profile.org = grunt.option('org') || process.env.ae_org; // replace with organization
  profile.env = environment; // replace with environment
  profile.url_mgmt = 'https://api.enterprise.apigee.com'; // for cloud environments, leave as is
  profile.username = grunt.option('username') || process.env.ae_username; // pass credentials as arguments as grunt task --username=$ae_username --password=$ae_password
  profile.password = grunt.option('password') || process.env.ae_password; // use ae_username and ae_password are defined as environment variables and no arguments are passed
  profile.revision = grunt.option('revision'); // provide revision to be undeployed by passing argument as --revision=X
  profile.override = grunt.option('override') || true;
  profile.delay = grunt.option('delay') || 10;
  profile.apikey = grunt.option('apikey') || process.env.ae_apikey;

  return profile;
};

exports.profiles = function(grunt) {
  return {
    env: grunt.option('env'), // replace with environment
    'dev': profile("test", grunt),
    'tlrgtest': profile("test", grunt),
    'tlrgsandbox': profile("sandbox", grunt),
    'tlrgprod': profile("prod", grunt),
    'integration': profile("prod", grunt)
  };
};

var setProxyEndpoints = function(basePath, virtualHost) {
  var result = {
    "replacements": []
  };

  result.replacements.push({
    "xpath": "//ProxyEndpoint/HTTPProxyConnection/BasePath",
    value: basePath
  });
  result.replacements.push({
    "xpath": "//ProxyEndpoint/HTTPProxyConnection/VirtualHost",
    value: virtualHost
  });

  return result;
};

var configureProxy = function(proxyFile, basePath, virtualHost) {
  var conf = {
    "options": {},
    "files": {}
  };

  conf.options = setProxyEndpoints(basePath, virtualHost);
  conf.files["target/apiproxy/proxies/" + proxyFile + ".xml"] = "apiproxy/proxies/" + proxyFile + ".xml";

  return conf;
};

var configureTargetEndpoint = function(targetEndpoint) {
  var conf = {
    "options": {},
    "files": {}
  };
  conf.options.xpath = "//TargetEndpoint/HTTPTargetConnection/URL";
  conf.options.value = targetEndpoint;
  conf.files["target/apiproxy/targets/default.xml"] = "apiproxy/targets/default.xml";

  return conf;
};

var gitRevision = function() {
  var conf = {
    "options": {},
    "files": {}
  };
  conf.options.xpath = "//APIProxy/Description";
  conf.options.value = "<%= grunt.option('gitRevision') %>";

  conf.files["target/apiproxy/<%= apigee_profiles[grunt.option('env')].apiproxy %>.xml"] = "apiproxy/*.xml";
  return conf;
};

var environment = function(basePath, virtualHost, targetEndpoint) {
  var environment = [];
  environment.push(gitRevision());
  environment.push(configureProxy("default", basePath, virtualHost));
  environment.push(configureTargetEndpoint(targetEndpoint));

  return environment;
};

exports.xmlconfig = function(env, grunt) {
  var config = {
    "dev": environment("/v1/hotels", "secure", "https://reqbot-api.herokuapp.com/hotels"),
    "tlrgsandbox": environment("/v1/hotels", "https_vhost", "https://reqbot-api.herokuapp.com/hotels"),
    "tlrgtest": environment("/v1/hotels", "https_vhost", "https://reqbot-api.herokuapp.com/hotels"),
    "tlrgprod": environment("/v1/hotels", "https_vhost", "https://reqbot-api.herokuapp.com/hotels"),
    "integration": environment("/v1/hotels", "secure", "https://reqbot-api.herokuapp.com/hotels")
  };

  if (!config[env]) {
    grunt.fail.fatal('Environment ' + env + ' does not exist under grunt/apigee-config.js');
  }

  return config[env];
};
