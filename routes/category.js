
/*
 * GET users listing.
 */

exports.list = function(db){
	return function(req, res) {
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			categories : null
		}
		db.collection("category").find().toArray(function(err, items) {
			if(err) {
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.categories = items;

			res.json(data);
		});
	}
};