process.env.NODE_ENV = 'test';
var app = require('../app');
var Browser = require('zombie');
var http = require('http');
var mongoose = require('mongoose')

describe('VeBnB', function() {
	beforeEach((done)=>{
		mongoose.connection.collections.spaces.drop(()=>{
			done();
			});
	});

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

    it('after Sign Up, redircets to listings page', function() {
      before(function(done) {
        this.browser.fill('username', 'Sam').then(function(){
          this.browser.pressButton('Sign Up')
        });
        this.browser.assert.text('text', 'Listings')
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
	});

	describe('visit home page', function() {
		before(function(done) {
			this.browser.visit('/',done);
		});
	
		describe('fills in space form', function() {
			before(function(done) {
				this.browser.fill('name', 'Love Shack')
										.fill('address', 'SmoochStreet 22')
										.fill('price', 20)
										.fill('description', 'for young and old')
										.pressButton('Enter', done);
			});

			it('has name text', function() {
        this.browser.assert.text('ul', 'Name: Love Shack at SmoochStreet 22 (£20) Description: for young and old Choose')
      });
    }); 
	});


	describe('choose button' , function() {
		before(function(done) {
      this.browser.visit('/', done);
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
