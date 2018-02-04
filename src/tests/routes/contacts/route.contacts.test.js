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
var sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
var app = require('../../../index');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Contacts - Route', function () {
  var Db = require('../../../models');
  var Contacts = Db.Contacts;
  var sandbox = null;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox && sandbox.restore();
  });

  sequelizeMockingMocha(
    Db.sequelize,
    path.resolve(path.join(__dirname, './contacts.json')),
    { 'logging': false }
  );

  describe('The model should', function() {
    it('exists', function () {
      chai.expect(Contacts).to.exist;
    });
  });

  describe('/contacts', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
      .get('/contacts')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('have basic props', function(done) {
      chai.request(app)
      .get('/contacts')
      .end(function(err, res) {
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('error');
        done();
      });
    });
    it('respond non empty data', function(done) {
      chai.request(app)
      .get('/contacts')
      .end(function(err, res) {
        expect(res.body.data).to.not.be.a('null');
        done();
      });
    });
    it('respond a data object with rows and count', function(done) {
      chai.request(app)
      .get('/contacts')
      .end(function(err, res) {
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data).to.have.property('count');
        done();
      });
    });
    it('respond a deep object with model properties', function(done) {
      chai.request(app)
      .get('/contacts')
      .end(function(err, res) {
        expect(res.body.data.rows[0]).to.have.property('name');
        expect(res.body.data.rows[0]).to.have.property('line1');
        expect(res.body.data.rows[0]).to.have.property('line2');
        expect(res.body.data.rows[0]).to.have.property('city');
        expect(res.body.data.rows[0]).to.have.property('state');
        expect(res.body.data.rows[0]).to.have.property('zip');
        expect(res.body.data.rows[0]).to.have.property('phone');
        done();
      });
    });
    it('filter returning results', function(done) {
      chai.request(app)
      .get('/contacts')
      .query({
        filter: '(373)%20'
      })
      .end(function(err, res) {
        expect(res.body.data.rows.length).to.equal(1);
        done();
      });
    });
    it('filter returning empty', function(done) {
      chai.request(app)
      .get('/contacts')
      .query({
        filter: '9999999999999'
      })
      .end(function(err, res) {
        expect(res.body.data.rows.length).to.equal(0);
        done();
      });
    });
    it('respond empty data', function(done) {
      chai.request(app)
      .get('/contacts')
      .query({
        limit: 0,
        page: 15,
      })
      .end(function(err, res) {
        expect(res.body.data.rows.length).to.equal(0);
        done();
      });
    });
  });

  describe('/contacts/(373)%20568-3540', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
      .get('/contacts/(373)%20568-3540')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('have basic props', function(done) {
      chai.request(app)
      .get('/contacts/(373)%20568-3540')
      .end(function(err, res) {
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('error');
        done();
      });
    });
    it('respond non empty data', function(done) {
      chai.request(app)
      .get('/contacts/(373)%20568-3540')
      .end(function(err, res) {
        expect(res.body.data).to.not.be.a('null');
        done();
      });
    });
    it('respond a deep object with model properties', function(done) {
      chai.request(app)
      .get('/contacts/(373)%20568-3540')
      .end(function(err, res) {
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('line1');
        expect(res.body.data).to.have.property('line2');
        expect(res.body.data).to.have.property('city');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('zip');
        expect(res.body.data).to.have.property('phone');
        done();
      });
    });
    it('respond empty data', function(done) {
      chai.request(app)
      .get('/contacts/1234')
      .end(function(err, res) {
        expect(res.body.data).to.be.a('null');
        done();
      });
    });
  });

});
