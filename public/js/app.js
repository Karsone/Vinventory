var vinventory = angular.module('vinventory', ['ngTouch','ngRoute']);

//Global Data
vinventory.factory("globalData", function(){

	var 
	customers = {},
	products = {}


	return{
		// data:data
		customers:customers,
		products:products
	}

});

//Global Functions
vinventory.factory("globalFunctions", function($http, $rootScope, $location, globalData){

	// var function = function(){
	// }

	var http = function(url, callback){
		$http({method: 'GET', url: url, params:data})
			.then(function(response){
				//Success
				var response = angular.fromJson(response.data);
				if (response.isCallSuccessful == 1) {
					var method = url.substring(url.length, url.lastIndexOf('.') + 1);
					console.log(method);
					if(response[method].isSuccessful == 1){
						(callback)(response);
					}else{
						alert("CALL ERROR");
					}

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