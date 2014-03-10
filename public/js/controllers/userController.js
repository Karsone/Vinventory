vinventory.controller("users", function($scope, $rootScope, globalData, globalFunctions, userService, $location, $anchorScroll){
	
	userService.users();
	$scope.users = globalData.users;

	$scope.chooseUser = function(user){
		$rootScope.selectedUser = user;
		$location.hash('top');
		$anchorScroll();
		$location.path("/products");
	}
	
});
