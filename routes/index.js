var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;
var User = require("../models/user").User;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB', user: 'Sam' });
});

router.get('/spaces', function(req, res, next) {
	addresses = [];
  Space.find({}, function(err,spaces) {
    spaces.forEach(function(space) {
      if (space.address !== undefined) {
      addresses.push(space.address);
      };
     })
  }).then(function(data) {
		res.render('spaces', { title: 'Listings', addresses: addresses, user: 'Sam'});
	}).catch(next);
});

router.get('/confirm', function(req, res) {
	res.render('confirm', { title: 'Confirmation', user: 'Sam'});
});

router.post('/spaces', function(req, res) {
	var addressNew = req.body.address;
  var temp = new Space({address: addressNew});
  temp.save(function(err) {
    if (err) return handleError(err);
  });
	res.redirect('/spaces');
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Sign Up', user: ''});
});

router.post('/signup', function(req, res) {
  var userNew = req.body.username;
  var temp = new User({username: userNew});
  console.log(userNew);
  temp.save(function() {
    if (userNew.length === 0) {
      res.redirect('/signup');
    } else {
      res.redirect('/spaces');
    };
  });
});

module.exports = router;
