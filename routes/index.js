var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;
var User = require("../models/user").User;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB', user: 'Sakitalotte' });
});

router.get('/spaces/new', function(req,res) {
  res.render('spaces/new', { title: 'VeBnB', user: 'Sakitalotte' });
});

router.get('/spaces/all', function(req, res, next) {
	var spaces = [];
	Space.find({}, function(err,spaces) {
    spaces.forEach(function(space) {
      if (space !== undefined) {
        spaces.push(space);
      };
     })
	}).then(function(spaces) {
			res.render('spaces/all', { title: 'Listings', spaces: spaces, user: 'Sakitalotte'});
	}).catch(next);
});

router.get('/confirm', function(req, res) {
	res.render('confirm', { title: 'Confirmation', user: 'Sakitalotte'});
});

router.post('/spaces', function(req, res) {
  var temp = new Space({name: req.body.name,
												address: req.body.address,
												price: req.body.price,
												description: req.body.description});
  temp.save(function(err) {
    if (err) {
      console.log('Missing input', err);
    } else {
      res.redirect('spaces/all');
    };
  });
});

router.get('/users/new', function(req, res) {
  res.render('users/new', { title: 'Sign Up', user: ''});
});

router.post('/signup', function(req, res) {
  var userNew = req.body.username;
  var temp = new User({username: userNew});
  console.log(userNew);
  temp.save(function() {
    if (userNew.length === 0) {
      res.redirect('/signup');
    } else {
      res.redirect('spaces/all');
    };
  });
});

module.exports = router;
