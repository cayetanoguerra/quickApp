var mongoose = require('mongoose');
var userTasks = require('./db').getUserTasksModel();

var redisUserTask = require('./db_redis')

var model = {};


/***************************

	Register a new user	

***************************/

model.registerUser = function(userData, cb) {

    //redisUserTask.set(userData.username, userData.email);

	var user = new userTasks(userData);
	user.save(cb);
}


/***************************

	Login a user	

***************************/

model.loginUser = function(userData, cb) {
	
	userTasks.findOne({username: userData.username, password: userData.password}, cb);
}


module.exports = model;
