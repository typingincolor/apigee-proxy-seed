/*globals describe:true, it:true, expect:true, before:true, beforeEach:true, after:true, afterEach:true*/

/* jshint node: true */
/* jshint expr: true */
/*eslint no-unused-expressions:0, no-console:0*/

var grunt = require('grunt');
var expect = require('chai').expect;
var request = require('superagent');
var tools = require('../tools');
var fs = require('fs');
var xml2jsParser = require('superagent-xml2jsparser');
require('superagent-proxy')(request);

var apigee_profile = {
  org: grunt.template.process("<%= apigee_profiles[grunt.option('env')].org %>"),
  apikey: grunt.template.process("<%= apigee_profiles[grunt.option('env')].apikey %>"),
  env: grunt.template.process("<%= apigee_profiles[grunt.option('env')].env %>")
};

var common = {
  url: 'https://' + apigee_profile.org + '-' + apigee_profile.env + '.apigee.net'
};

var proxy = process.env.https_proxy || '';

describe('Generic Tests', function() {
  "use strict";

  this.timeout(15000);

  before(function() {});
  beforeEach(function() {});

  describe('Check status resource', function() {
    it('should respond OK', function(done) {
      tools.getRequest(request, proxy, common.url + '/v1/hotels/status')
        .set('X-TLRG.apikey', apigee_profile.apikey)
        .set("X-TLRG.test", "RATES_QUERY_1")
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res).to.be.text;
          done();
        });
    });
  });

  after(function() {});
  afterEach(function() {});
});
