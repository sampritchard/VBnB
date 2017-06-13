process.env.NODE_ENV = 'test';
var app = require('../app');
var Browser = require('zombie');
var http = require('http');


describe('VeBnB', function() {
  before(function() {
    this.server = http.createServer(app).listen(8080);
    this.browser = new Browser({ site: 'http://localhost:8080' });
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


  });

    describe('listings page', function() {
      before(function(done) {
        this.browser.visit('/spaces', done);
      });

      it('should be successful', function() {
        this.browser.assert.success();
      });

      it('has a request button', function() {
        this.browser.assert.text('button', 'Request');
      });




      it('the request button sends to a confirmation page', function() {
          this.browser.pressButton('Request').then(function(){
            assert.text('body', 'Your request has been submitted');
          })
      });
    });

	after(function(done) {
		this.server.close(done);
	});


});
