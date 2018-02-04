/**
* Test around the @{UserService}
*
* @module test/user/service
*/

'use strict';

var chai = require('chai');
var sinon = require('sinon');
var path = require('path');
var sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('Contacts - Model', function () {
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

  describe('The getAllContacts method should', function () {
    it('exist', function () {
      chai.expect(Contacts.getAllContacts).to.exist;
    });

    it('return an object with the count and the rows', function () {
      return Contacts
      .getAllContacts()
      .then(function (queryResponse) {
        chai.expect(queryResponse).to.have.property('count');
        chai.expect(queryResponse).to.have.property('rows');
        chai.expect(queryResponse.count).to.equal(1);
      });
    });

    it('contain a deep object with the model properties', function () {
      return Contacts
      .getAllContacts()
      .then(function (queryResponse) {
        chai.expect(queryResponse.rows[0]).to.have.property('name');
        chai.expect(queryResponse.rows[0]).to.have.property('line1');
        chai.expect(queryResponse.rows[0]).to.have.property('line2');
        chai.expect(queryResponse.rows[0]).to.have.property('city');
        chai.expect(queryResponse.rows[0]).to.have.property('state');
        chai.expect(queryResponse.rows[0]).to.have.property('zip');
        chai.expect(queryResponse.rows[0]).to.have.property('phone');
      });
    });

    it('return empty when limit is 0', function () {
      return Contacts
      .getAllContacts(0,0)
      .then(function (queryResponse) {
        chai.expect(queryResponse.rows.length).to.equal(0);
      });
    });

    it('return empty when offset exeeded', function () {
      return Contacts
      .getAllContacts(1,2)
      .then(function (queryResponse) {
        chai.expect(queryResponse.rows.length).to.equal(0);
      });
    });

    it('return 1 when limit is 1 and offset is 0', function () {
      return Contacts
      .getAllContacts(1,0)
      .then(function (queryResponse) {
        chai.expect(queryResponse.rows.length).to.equal(1);
      });
    });

    it('filter returning results', function () {
      return Contacts
      .getAllContacts(1,0,'(373)')
      .then(function (queryResponse) {
        console.log
        chai.expect(queryResponse.rows.length).to.equal(1);
      });
    });

    it('filter returning empty', function () {
      return Contacts
      .getAllContacts(1,0, '999999999')
      .then(function (queryResponse) {
        chai.expect(queryResponse.rows.length).to.equal(0);
      });
    });
  });

  describe('The findByPhone method should', function () {
    it('exist', function () {
      chai.expect(Contacts.findByPhone).to.exist;
    });

    it('not be null', function () {
      return Contacts
      .findByPhone('(373) 568-3540')
      .then(function (queryResponse) {
        chai.expect(queryResponse).to.not.be.a('null');
      });
    });

    it('contain the model properties', function () {
      return Contacts
      .findByPhone('(373) 568-3540')
      .then(function (queryResponse) {
        chai.expect(queryResponse).to.have.property('name');
        chai.expect(queryResponse).to.have.property('line1');
        chai.expect(queryResponse).to.have.property('line2');
        chai.expect(queryResponse).to.have.property('city');
        chai.expect(queryResponse).to.have.property('state');
        chai.expect(queryResponse).to.have.property('zip');
        chai.expect(queryResponse).to.have.property('phone');
      });
    });

    it('to be null when phone does not exist', function () {
      return Contacts
      .findByPhone('1234')
      .then(function (queryResponse) {
        chai.expect(queryResponse).to.be.a('null');
      });
    });
  });

});
