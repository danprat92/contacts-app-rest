"use strict";

var models = require('./models');
/**
* Declares all the routes available
* @param  {Object} app Express instance
*/
var Routes = function(app) {
  /**
  * Route to test correct functionality
  * @param  {[type]} req [description]
  * @param  {[type]} res [description]
  * @return {[type]}     [description]
  */
  app.get('/', function(req, res) {
    res.status(200).send({
      code : 200,
      data : 'Server running correctly',
      error : null,
    });
  });
  /**
  * Find all contacts
  * @param  {[type]} req [description]
  * @param  {[type]} res [description]
  * @param  {[type]} req.query.limit Max number of resulting records
  * @param  {[type]} req.query.page Current page
  * @return {[type]}     [description]
  */
  app.get('/contacts', function(req, res) {
    var contacts = models.Contacts;
    var limit = req.query.limit ? req.query.limit : 100;
    var offset = req.query.page ? req.query.page * limit : 0;
    var filter = req.query.filter ? decodeURIComponent(req.query.filter) : null;

    contacts.getAllContacts(limit, offset, filter).then(function(queryResult) {
      res.status(200).send({
        code : 200,
        data : queryResult,
        error : null,
      });
    }).catch(function(err) {
      console.log(err);
      res.status(500).send({
        code : 500,
        data : null,
        error : err,
      });
    });
  });
  /**
  * Find a specific contact
  * @param  {[type]} req [description]
  * @param  {[type]} res [description]
  * @param  {[type]} req.params.phone Contact phone to find details
  * @return {[type]}     [description]
  */
  app.get('/contacts/:phone', function(req, res) {
    var contacts = models.Contacts;
    var phone = decodeURIComponent(req.params.phone);

    contacts.findByPhone(phone).then(function(queryResult) {
      if(queryResult) {
        res.status(200).send({
          code : 200,
          data : queryResult,
          error : null,
        });
      }else {
        res.status(404).send({
          code : 404,
          data : null,
          error : 'resource not found',
        });
      }
    }).catch(function(err) {
      res.status(500).send({
        code : 500,
        data : null,
        error : err,
      });
    });
  });
  /**
  * Route dedicated to attach any unrecognized routes
  * @param  {[type]} req [description]
  * @param  {[type]} res [description]
  * @return {[type]}     [description]
  */
  app.use(function(req, res){
    res.status(404).send({
      code: 404,
      data: null,
      error: 'Requested route not found',
    });
  });
};

module.exports = Routes;
