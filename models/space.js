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
      }

})

var Space = mongoose.model('Space', spaceSchema);

module.exports = {
  Space: Space
}
