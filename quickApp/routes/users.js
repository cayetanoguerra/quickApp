var express = require('express');
var router = express.Router();
var userModel = require(__dirname + '/../models/user'); 


/***************************

	Register a new user	

***************************/


router.get('/register', function(req, res, next) {
	
	res.render('register', {});
});


router.post('/register', function(req, res, next) {
	
	userModel.registerUser(req.body, function(err, user) {
		if (err) {
			res.send("Ha ocurrido un error en el registro del usuario");
		} else {
			res.redirect('/tasks/' + user.username);
		}
	});
});

module.exports = router;