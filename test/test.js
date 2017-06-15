process.env.NODE_ENV = 'test';
var app = require('../app');
var Browser = require('zombie');
var http = require('http');


describe('VeBnB', function() {

  before(function() {
    this.server = http.createServer(app).listen(8080);
    this.browser = new Browser({ site: 'http://localhost:8080' });
  });

  describe ('sign up', function() {
    before(function(done) {
      this.browser.visit('/signup', done);
    })

    it('should be successful', function() {
      this.browser.assert.success();
    });

    it('should have content', function() {
      this.browser.assert.text('title', 'Sign Up');
    });

    it('should have an Sign Up button',function() {
      this.browser.assert.text('button', 'Sign Up');
    });

    it('after Sign Up, redirects to listings page', function() {
      before(function(done) {
        this.browser.fill('username', 'Sam').then(function(){
          this.browser.pressButton('Sign Up')
        });
        this.browser.assert.text('text', 'Listings')
      });
    });

    it('stays on signup if sign up is not valid', function() {
      before(function(done) {
        this.browser.fill('username', '').then(function(){
          this.browser.pressButton('Sign Up')
        });
        this.browser.assert.text('title', 'Sign Up')
      });
    });


  });

  describe('home page', function() {
    before(function(done) {
      this.browser.visit('/', done);
    });

    it('should be successful', function() {
      this.browser.assert.success();
    });

    it('should have content', function() {
      this.browser.assert.text('title', 'VeBnB');
    });

    it('should have an enter button',function() {
      this.browser.assert.text('button', 'Enter');
    });

    it('has a Choose button', function() {
      before(function(done) {
        this.browser.pressButton('Enter').then(function(){
          this.browser.assert.text('body', 'Listings')
        });
        this.browser.assert.text('button', 'Choose')
      });
    });

    it('the request button sends to a confirmation page', function() {
      before(function(done) {
        this.browser.pressButton('Enter').then(function(){
          this.browser.assert.text('body', 'Listings')
        });

        this.browser.pressButton('Choose').then(function(){
          assert.text('body', 'Your request has been submitted');
        })
      });
    });
  });

  describe('listings page', function() {
    before(function(done) {
      this.browser.visit('/spaces', done);
    });


    it('should be successful', function() {
      this.browser.assert.success();
    });
  });

  after(function(done) {
    this.server.close(done);
  });
});
