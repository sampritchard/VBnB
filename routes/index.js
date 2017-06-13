var express = require('express');
var router = express.Router();

addresses = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB' });
});

router.get('/spaces', function(req, res) {
	res.render('spaces', { title: 'Listings', addresses: addresses});
});

router.post('/spaces', function(req, res) {
	var address = req.body.address;
	addresses.push(address);
	res.redirect('/spaces');
});

module.exports = router;
