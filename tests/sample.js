/*globals describe:true, it:true, expect:true, before:true, beforeEach:true, after:true, afterEach:true*/

/* jshint node: true */
/* jshint expr: true */
/*eslint no-unused-expressions: 0*/

//var grunt = require('grunt');
var chai = require('chai');
//var assert = require('chai').assert;
var expect = require('chai').expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Sample API Test', function() {
  "use strict";
  before(function() {});
  beforeEach(function() {});

  describe('Check status resource', function() {
    it('should respond OK', function(done) {
      chai.request('https://losd-test.apigee.net').get('/v1/sample/status').end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.text;
        done();
      });
    });
  });

  describe('Check other resource', function() {
    it('should get my ip address', function(done) {
      chai.request('https://losd-test.apigee.net').get('/v1/sample/blah').end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.ip).to.be.an.ip;
        done();
      });
    });
  });

  after(function() {});
  afterEach(function() {});
});
