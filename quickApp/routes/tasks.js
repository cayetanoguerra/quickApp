var express = require('express');
var router = express.Router();
var taskModel = require(__dirname + '/../models/task'); 


/***************************

	Add new task

***************************/

router.post('/newtask', function(req, res, next) {
	
	taskModel.addNewTask('cayetano', req.body.task, function(err, result){
		res.redirect('/tasks/cayetano');	
	});
});


/***************************

	Find user's tasks	

***************************/

router.get('/:username', function(req, res, next) {
	
	taskModel.findUserTasks(req.params.username, function(err, user) {
		res.render('tasks', user);
	});
});


module.exports = router;