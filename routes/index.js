var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;
var User = require("../models/user").User;
var cookieParser = require('cookie-parser');
var session = require('express-session');

router.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'shh, very secret'
}));

router.post('/signin', function(req,res) {
  req.session.user = req.body.username;
  req.session.status = req.body.status;
  res.redirect('/spaces/all');
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
			res.render('spaces/all', { title: 'Listings Available',
                                spaces: spaces,
                                user: req.session.user,
                                status: req.session.status});
	}).catch(next);
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'VeBnB',
                        user: req.session.user,
                        status: req.session.status});
});

router.get('/spaces/new', function(req,res) {
  res.render('spaces/new', { title: 'VeBnB',
                             user: req.session.user,
                             status: req.session.status });
});


router.post('/confirmrequest', function(req, res) {
  Space.update({ _id :req.body.id }, {$set: {requested: true}}).then(function() {
    res.redirect('/spaces/all');
  })
});

router.post('/confirmbooking', function(req, res) {
	console.log(req.body.id)
	Space.update({ _id: req.body.id }, {$set: {booked: true}}).then(function() {
		res.render('confirm', { title: 'Confirmation', user: 'Sakitalotte'});
	});
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

router.get('/spaces/requested', function(req, res, next) {
	var requestedSpaces = [];
	Space.find({requested: true}, function(err,spaces) {
		requestedSpaces = spaces;
  	console.log(spaces);
		setTimeout(function() {}, 30000);
	}).then(function(spaces) {
		res.render('spaces/requested', { title: 'Listings Requested', spaces: requestedSpaces, user: 'Sakitalotte'})
	}).catch(next);
});

router.get('/users/new', function(req, res) {
  res.render('users/new', { title: 'Sign Up', user: ''});
});


router.post('/signup', function(req, res) {
  var userNew = req.body.username;
  var temp = new User({username: userNew});
  temp.save(function() {
    if (userNew.length === 0) {
      res.redirect('/signup');
    } else {
      res.redirect('spaces/all');
    };
  });
});

module.exports = router;
