var ObjectID = require('mongodb').ObjectID,
	MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
/*
 * GET users listing.
 */

exports.list = function(){
	return function(req, res) {
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			categories : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('categories').find().toArray(function(err, items) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.categories = items;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};