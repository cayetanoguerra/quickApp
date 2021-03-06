var express = require('express');
var router = express.Router();
var taskModel = require(__dirname + '/../models/task'); 


/***************************

	Add new task

***************************/

router.post('/newtask', function(req, res, next) {
	
	taskModel.addNewTask(req.session.username, req.body.task, function(err, result){
		res.redirect('/tasks/' + req.session.username);	
	});
});


/***************************

	Find user's tasks	

***************************/

router.get('/:username', function(req, res, next) {
    
    console.log(req.headers);
	
	taskModel.findUserTasks(req.params.username, function(err, user) {
    	if (user != null) {
            if (req.params.username == req.session.username) {
			    res.render('tasks_add', user);	
		    } else {
			    res.render('tasks', user);
		    }	
    	}
    	else {
        	res.send('Usuario no encontrado');
    	}
	});
});


module.exports = router;