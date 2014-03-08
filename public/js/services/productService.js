vinventory.factory("productService", function($http, globalData, globalFunctions){

	var products = function(callback){
		globalFunctions.http("/products", null ,function(response){
			angular.copy(response.products, globalData.products);
			if(callback) (callback)(response);
		});
	}


	var productCreate = function(product, callback){
		$http.post("/product/create", product).success(function(response){
			console.log(response);
		});
		// globalFunctions.http("/product/create", product ,function(response){
		// 	console.log(response);
		// 	if(callback) (callback)(response);
		// });
	}
	return{
		productCreate:		productCreate,
		products:			products
	};
});