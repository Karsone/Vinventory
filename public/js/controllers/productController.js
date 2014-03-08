vinventory.controller("products", function($scope, $rootScope, globalData, globalFunctions, productService){
	
	productsService.products();
	$scope.products = globalData.products;

});


vinventory.controller("modifyProducts", function($scope, $rootScope, globalData, globalFunctions, productService){
	

	$scope.productCreate = function(){

		product = {
		      "categoryIDs": "",
		      "name": "Apple Juice",
		      "imageURL": "/images/productPhotos/thumbnails/apple.jpg",
		      "unit": 1,
		      "abuseMessage": "Too much pee bro..",
		      "isAlcoholic": 0
		    }
		productService.productCreate(product, function(){
			// callback
		});
	}

});
