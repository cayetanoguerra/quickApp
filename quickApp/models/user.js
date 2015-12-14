var mongoose = require('mongoose');
var userTasks = require('./db').getUserTasksModel();

var model = {};


/***************************

	Register a new user	

***************************/

model.registerUser = function(userData, cb) {

	var user = new userTasks(userData);
	user.save(cb);
}

module.exports = model;
