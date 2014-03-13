var ObjectID = require('mongodb').ObjectID,
	MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
/*
 * GET users listing
 */
exports.list = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			users : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('users').find().toArray(function(err, items) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.users = items;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

/*
 * GET user by ID.
 */
exports.load = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			user : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('users').find({"_id": new ObjectID(req.params.id)}).toArray(function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.user = item;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

/*
 * POST new user
 */
exports.create = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			user : null
		}, 
		mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true}),
		userData = req.body,
		newUser = {
			"name": null,
			"email": null,
			"imageURL": null,
			"gender": null,
			"birthDate": null,
			"isStocker": 0,
			"isActive": 1
		}

		for (key in userData){
			switch (key){
				case "birthDate":
					if(userData[key]){
						newUser[key] = userData[key];
					}
				case "isStocker":
					if(userData[key]){
						newUser[key] = userData[key];
					}
				case "isActive":
					if(userData[key]){
						newUser[key] = userData[key];
					}
				case "_id":
					break;
				default:
					if(userData[key]){
						newUser[key] = userData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('users').save(newUser, {safe:true}, function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.user = item;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

/*
 * PUT updated user data
 */
exports.edit = function(){
	return function(req, res){

		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			user : null
		},
		mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true}),
		userData = req.body,
		updatedUser = {};

		for (key in userData){
			switch (key){
				case "birthDate":
					if(userData[key]){
						updatedUser[key] = userData[key];
					}
				case "isStocker":
					if(userData[key]){
						updatedUser[key] = userData[key];
					}
				case "isActive":
					if(userData[key]){
						updatedUser[key] = userData[key];
					}
				case "_id":
					break;
				default:
					if(userData[key]){
						updatedUser[key] = userData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('users').update({"_id": new ObjectID(req.params.id)}, { $set: updatedUser }, {safe:true}, function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.user = item;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
}

/*
 * DELETE user by ID
 */
exports.delete = function(){
	return function(req, res){

		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			users: []
		}

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('users').remove({"_id": new ObjectID(req.params.id)}, true, function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.users = exports.list(db);

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
}