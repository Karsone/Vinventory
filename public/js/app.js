var vinventory = angular.module('vinventory', ['ngTouch','ngRoute','ngResource']).
	run(function(productService){
		productService.products();
	});

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
vinventory.factory("globalFunctions", function($http, $rootScope, $location, globalData, $location){

	// var function = function(){
	// }

	var http = {

		get: function(url, data, callback){
			$http({method: 'GET', url: url, params:data})
				.then(function(response){
					//Success

					var response = angular.fromJson(response.data);
					if (response.isSuccessful == 1) {
						(callback)(response);
					} else {
						alert(response.alertMessages);
					}
				}, function(response){
					//Error
					alert("BIG ERROR");
					$location.reload();
				})
		},
		post: function(url, data, callback){

			$http.post(url, data).success(function(response){
				if (response.isSuccessful == 1) {
					(callback)(response);
				} else {
					alert(response.alertMessages);
				}
			});

		},
		put: function(url, data, callback){

			$http.put(url, data).success(function(response){
				if (response.isSuccessful == 1) {
					(callback)(response);
				} else {
					alert(response.alertMessages);
				}
			});

		},
	}

	return{
		// function:funciton
		http:http
	};
});