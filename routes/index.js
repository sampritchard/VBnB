var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB' });
});

router.get('/spaces', function(req, res, next) {
	addresses = [];
  Space.find({}, function(err,spaces) {
    spaces.forEach(function(space) {
      addresses.push(space.address);
     })
  }).then(function(data) {
		res.render('spaces', { title: 'Listings', addresses: addresses});
	}).catch(next);
});

router.get('/confirm', function(req, res) {
	res.render('confirm', { title: 'Confirmation'});
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
