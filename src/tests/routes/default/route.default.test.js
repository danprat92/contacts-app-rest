/**
* Test around the @{UserService}
*
* @module test/user/service
*/

'use strict';

var chai = require('chai');
var sinon = require('sinon');
var path = require('path');
var chaiHttp = require('chai-http');
var app = require('../../../index');
var expect = chai.expect;
var server = null;

chai.use(chaiHttp);

describe('Default - Routes', function () {
  describe('/', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('/anynotfoundroute', function() {
    it('responds with status 404', function(done) {
      chai.request(app)
      .get('/anynotfoundroute')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
