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

  // beforeEach((done)=>{
  //   mongoose.connection.collections.spaces.drop(()=>{
  //     done();
  //     });
  // });


  describe('Booking a space', ()=>{
      var space;
    before( function(done){
      space = new Space({name: 'TEST DO NOT TURN BOOKING TO TRUE EVER!!!!!!!!!!... please', price: 40, address: 'Fake 22'})
      space.save()
      done();

    })

		it('has a default value of booked equals false', (done) => {

					Space.find({}, function(err, spaces) {
            expect(spaces[spaces.length-1].booked).to.equal(false)
						done();

				});
		});


	  });
});
