/*jshint node:true*/
var ZIPCODES = require('zip_codes/us-zipcodes').features;
var length = Math.round(ZIPCODES.length / 100);

var PAGES = [];
var page = [];
PAGES.push(page);
for (var i = 0; i < ZIPCODES.length; i++) {
  if (page.length === length) {
    page = [];
    PAGES.push(page);
  }
  page.push(ZIPCODES[i]);
}

module.exports = function(app) {
  var express = require('express');
  var zipcodesRouter = express.Router();

  zipcodesRouter.get('/', function(req, res) {
    res.send({
      'zipcodes': {
        total: PAGES.length,
        count: ZIPCODES.length
      }
    });
  });

  zipcodesRouter.get('/:id', function(req, res) {
    res.send({
      'zipcodes': PAGES[req.params.id]
    });
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/zipcodes', require('body-parser').json());
  app.use('/api/zipcodes', zipcodesRouter);
};
