// http://192.168.6.139:3000/users

vinventory.factory("userService", function(globalData, globalFunctions){

	var users = function(callback){
		globalFunctions.http.get("/users", null ,function(response){
			angular.copy(response.users, globalData.users);
			if(callback) (callback)(response);
		});
	}
	return{
		users: users
	};
});