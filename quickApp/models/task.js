var mongoose = require('mongoose');
var userTasks = require('./db').getUserTasksModel();

var redisUserTask = require('./db_redis')

var model = {};


/***************************

	Add new task

***************************/

model.addNewTask = function(username, task, cb) {

    redisUserTask.rpush(username, task);

	userTasks.findOne({username: username}, function(err, user){
		user["tasks"].push({"task": task });
		user.save(cb);
	});
}


/***************************

	Find user's tasks	

***************************/

model.findUserTasks = function(username, cb) {
    
    redisUserTask.lrange(username, 0, -1, function(err, data){
        if (data.length != 0) {
            console.log("Devuelto por Redis....");
            
            result = {};
            result['username'] = username;
            result['tasks'] = [];
            for (var i in data) {
                result['tasks'].push({'task' : data[i]});    
            }
            cb(0, result);
        }    
        else {
            console.log("Devuelto por MongoDB....");
             
            userTasks.findOne({username: username}, function(err, user){
                
                if (user != null) {
                
                    if (user['tasks'].length != 0) {        
                        taskList = [];
                        for (var i=0; i<user['tasks'].length; i++) {
                            taskList.push(user['tasks'][i]['task']);
                        }
                        redisUserTask.rpush(username, taskList);
                        cb(err, user);        
                    }
                    else {
                        cb(err, user);
                    }  
                }
                else {
                    console.log("Usuario no encontrado");
                    cb(err, user);
                }
            });   
        }
    });
}


module.exports = model;
