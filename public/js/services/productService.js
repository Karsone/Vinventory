vinventory.factory("productService", function($route, $routeParams, $resource, $http, globalData, globalFunctions){

	var products = function(callback){
		globalFunctions.http.get("/products", null ,function(response){
			angular.copy(response.products, globalData.products);
			if(callback) (callback)(response);
		});
	}

	var productCreate = function(formData, callback){
		globalFunctions.http.post("/product", formData ,function(response){
			angular.copy(response.products, globalData.products);
			if(callback) (callback)(response);
		});
	}

	var consumption = function(user, product, callback){
		console.log(user);
		console.log(product);
		globalFunctions.http.post("/consumption", {userID:user._id, productID:product._id} ,function(response){
			if(callback) (callback)(response);
		});
	}
	return{
		consumption: 		consumption,
		productCreate:		productCreate,
		products:			products
	};
});