var mongoose = require('mongoose')
var chai = require('chai')
var Space = require('../models/space').Space;
var expect = chai.expect;


describe('Booking', function() {
	// before((done)=>{
	// 	mongoose.createConnection('mongodb://localhost/test_3');
	// 	mongoose.connection
	// 		.once('open', ()=>{ done(); })
	// 		.on('error', (error)=> {
	// 			console.warn('Error', error);
	// 		});
	// });

  beforeEach((done)=>{
    mongoose.connection.collections.spaces.drop(()=>{
      done();
      });
  });


  describe('Booking a space', ()=>{
		it('has a default value of booked equals false', (done) => {
			var space = new Space({name: 'The Best Place', price: 40, address: 'Fake 22'})
			space.save()
				.then(function() {
					Space.find({}, function(err, spaces) {
            expect(spaces[0].booked).to.equal(false)
						done();
					});
				});
		});
	});
});
