var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  address: String,
  booked:  { type: Boolean, default: false }
})

var Space = mongoose.model('Space', spaceSchema);

module.exports = {
  Space: Space
}
