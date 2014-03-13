var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
/*
 * GET Test
 */

exports.testDatabase = function(){
	return function(req, res){
		// Setup data structure
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			test : null
		}

		// Set up the connection to the local db
		var mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		// Open the connection to the server
		mongoclient.open(function(err, mongoclient) {

		  // Get the first db and do an update document on it
		  var db = mongoclient.db("vinventory");
		  db.collection('products').find().toArray(function(err, result) {
		  	// Store products in test 
		  	data.test = result;

		  	// Close connection
		    mongoclient.close();

		    // Return the data structure
		    res.json(data); 
		  });
		});
	}
};

