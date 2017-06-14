var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;

addresses = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB' });
});

router.get('/spaces', function(req, res) {
    Space.find({}, function(err,spaces) {
      spaces.forEach(function(space) {
        console.log(space);
        console.log(space.address);
        addresses.push(space.address);
      });
    console.log(addresses);
  });
	res.render('spaces', { title: 'Listings', addresses: addresses});
});

router.post('/spaces', function(req, res) {
	var addressNew = req.body.address;
  var temp = new Space({address: addressNew});
  temp.save(function(err) {
    if (err) return handleError(err);
  });
	res.redirect('/spaces');
});

module.exports = router;
