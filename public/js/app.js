var vinventory = angular.module('vinventory', ['ngTouch','ngRoute']);

//Global Data
vinventory.factory("globalData", function(){

	var 
	users = [],
	products = []


	return{
		// data:data
		users:users,
		products:products
	}

});

//Global Functions
vinventory.factory("globalFunctions", function($http, $rootScope, $location, globalData){

	// var function = function(){
	// }

	var http = function(url, data, callback){
		$http({method: 'GET', url: url, params:data})
			.then(function(response){
				//Success

				var response = angular.fromJson(response.data);
				if (response.isSuccessful == 1) {
					(callback)(response);
				} else {
					alert("ERROR");
				}
			}, function(response){
				//Error
				alert("BIG ERROR");
			})
		;
	}

	return{
		// function:funciton
		http:http
	};
});