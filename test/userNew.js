var mongoose = require('mongoose')
var chai = require('chai')
var User = require('../models/user').User;
var expect = chai.expect;

describe('Users', function() {

  before((done)=>{
		mongoose.createConnection('mongodb://localhost/test_2');
		mongoose.connection
			.once('open', ()=>{ done(); })
			.on('error', (error)=> {
				console.warn('Error', error);
			});
      done();
	});

	beforeEach((done)=>{
		mongoose.connection.collections.users.drop(()=>{
			done();
			});
	});

describe('validating inputs', ()=> {
  it('validates if username is input', () => {
    var user = new User();
    user.save(function(error) {
      expect.to.equal(error.errors['username'].message,
      'Path `name` is required.');

      error = user.validateSync();
      expect.to.equal(error.errors['username'].message,
        'Path `name` is required.');
    });
  });

  it('validates if password is input', () => {
    var user = new User();
    user.save(function(error) {
      expect.to.equal(error.errors['password'].message,
      'Path `password` is required.');

      error = user.validateSync();
      expect.to.equal(error.errors['password'].message,
        'Path `password` is required.');
    });
  });

});

  describe('new user', ()=>{
    it('saves new user to user database', (done) => {
      var user = new User({username: 'Voldemort', password: 'xxx'});
      user.save()
        .then(function() {
          User.find({}, function(err, users) {
            expect(users[0].username).to.equal('Voldemort');
            done();
          });
        });
    });
  });

});
