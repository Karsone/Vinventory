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

	var productEdit = function(formData, callback){
		globalFunctions.http.put("/product/"+formData._id+"", formData ,function(response){
			// angular.copy(response.products, globalData.products);
			console.log(response);
			if(callback) (callback)(response);
		});
	}

	var consumption = function(user, product, callback){
		globalFunctions.http.post("/consumption", {userID:user._id, productID:product._id} ,function(response){
			if(callback) (callback)(response);
		});
	}
	return{
		consumption: 		consumption,
		productEdit:		productEdit,
		productCreate:		productCreate,
		products:			products
	};
});