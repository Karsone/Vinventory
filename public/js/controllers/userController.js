vinventory.controller("users", function($scope, $rootScope, globalData, globalFunctions, userService, $location){
	
	userService.users();
	$scope.users = globalData.users;

	$scope.chooseUser = function(user){
		$rootScope.selectedUser = user;
		$location.path("/products");
	}
	
});
