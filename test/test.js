process.env.NODE_ENV = 'test';
var app = require('../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var http = require('http');

describe('contact page', function() {
  before(function() {
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  // load the contact page
  before(function(done) {
    this.browser.visit('/', done);
  });

  it('should be successful', function() {
    this.browser.assert.success();
  });




});
