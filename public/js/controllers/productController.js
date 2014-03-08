vinventory.controller("listProducts", function($scope, $rootScope, globalData, globalFunctions){
	
	productsService.listProducts();
	$scope.products = globalData.products;

});
