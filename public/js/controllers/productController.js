vinventory.controller("products", function($location, $scope, $rootScope, globalData, globalFunctions, productService){

	$scope.products = globalData.products;

	$scope.confirmProduct = function(product){
		$rootScope.selectedProduct = product;
		productService.consumption($rootScope.selectedUser, $rootScope.selectedProduct, function(response){
			$rootScope.selectedProduct = null;
			$rootScope.selectedUser = null;
			$location.path("/");
		});
	}

	$scope.chooseProduct = function(product){
		$scope.confirm = product;
	}

});


vinventory.controller("modifyProducts", function($scope, $rootScope, globalData, globalFunctions, productService){


	$scope.products = globalData.products;



	$scope.toggleEditing = function(product){
		$scope.productEditing = true;
		$scope.productCreating = false;
		$scope.productEditingForm = product;
	}

	$scope.toggleCreate = function(){
		$scope.productCreating = true;
		$scope.productEditing = false;
	}
	
	

	$scope.productCreate = function(formData){
		productService.productCreate(formData, function(){
			alert("Product Added!");
		});
	}

});
