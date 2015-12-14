var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/quickDB");


var userTasksSchema = mongoose.Schema({ 
			username: String,
			email: String,
			tasks: [{
				task: String,
				date: { type: Date, default: Date.now }
				}] 	
			});
			
			
module.exports = {
	getUserTasksModel: function() {
		return connection.model("userTasks", userTasksSchema);
	}
};



