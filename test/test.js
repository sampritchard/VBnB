process.env.NODE_ENV = 'test';
var app = require('../app');
var Browser = require('zombie');
var http = require('http');
var mongoose = require('mongoose')
var chai = require('chai')
var expect = chai.expect;

describe('VeBnB', function() {
	/*beforeEach((done)=>{
		mongoose.connection.collections.spaces.drop(()=>{
			done();
			});
	});*/

  before(function() {
    this.server = http.createServer(app).listen(8080);
    this.browser = new Browser({ site: 'http://localhost:8080' });
  });

  describe ('sign up', function() {
    before(function(done) {
      this.browser.visit('/users/new', done);
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
      this.browser.visit('/spaces/new', done);
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
			this.browser.visit('/spaces/new',done);
		});

		describe('fills in space form', function() {
			before(function(done) {
				this.browser.fill('name', 'Love Shack')
										.fill('address', 'SmoochStreet 22')
										.fill('price', 20)
										.fill('description', 'for young and old')
				this.browser.pressButton('Enter', done);
			});


			it('has name text', function() {
        var pageBody = this.browser.text();
				expect(pageBody).to.have.string('Love Shack')
				expect(pageBody).to.have.string('SmoochStreet 22')
				expect(pageBody).to.have.string('20')
				expect(pageBody).to.have.string('for young and old')
			});
    });
	});


	describe('choose button' , function() {
		before(function(done) {
      this.browser.visit('/spaces/new', done);
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
