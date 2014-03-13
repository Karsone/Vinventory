var ObjectID = require('mongodb').ObjectID,
	MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
/*
 * GET User Report
 */

exports.userReport = function() {
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			consumptions : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('consumptions').find({ "userID": req.params.id}).toArray(function(err, items) { 
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.consumptions = items;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

