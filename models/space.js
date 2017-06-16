var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  name: {
        type: String,
        required: true
      },
  description: {
        type: String,
        required: true
      },
  price: {
        type: Number,
        required: true
      },
  address: {
        type: String,
        required: true
      },
  booked:  {
        type: Boolean,
        default: false
      },
	requested: {
				type: Boolean,
				default: false
	},
	image: {
				type: String,
				default: 'https://activerain-store.s3.amazonaws.com/image_store/uploads/agents/kenttemple/files/bigstock-Cartoon-house-256406061.jpg'
	}
})

var Space = mongoose.model('Space', spaceSchema);

module.exports = {
  Space: Space
}
