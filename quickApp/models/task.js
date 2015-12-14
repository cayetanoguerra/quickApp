var mongoose = require('mongoose');
var userTasks = require('./db').getUserTasksModel();

var model = {};


/***************************

	Add new task

***************************/

model.addNewTask = function(username, task, cb) {
		
	userTasks.findOne({username: username}, function(err, user){
		user["tasks"].push({"task": task });
		user.save(cb);
	});
}


/***************************

	Find user's tasks	

***************************/

model.findUserTasks = function(username, cb) {
	
	userTasks.findOne({username: username},  cb  );
}


module.exports = model;
