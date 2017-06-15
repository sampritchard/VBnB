var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB', user: 'Sam' });
});

router.get('/spaces', function(req, res, next) {
	var spaces = [];
	Space.find({}, function(err,spaces) {
    spaces.forEach(function(space) {
      if (space !== undefined) {
        spaces.push(space);
      };
     })
	}).then(function(spaces) {
			res.render('spaces', { title: 'Listings', spaces: spaces, user: 'Sam'}); 
	}).catch(next);
});

router.get('/confirm', function(req, res) {
	res.render('confirm', { title: 'Confirmation', user: 'Sam'});
});

router.post('/spaces', function(req, res) {
  var temp = new Space({name: req.body.name,
												address: req.body.address,
												price: req.body.price,
												description: req.body.description});
  temp.save(function(err) {
    if (err) return handleError(err);
  });
	res.redirect('/spaces');
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Sign Up', user: ''});
});

module.exports = router;
