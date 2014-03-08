vinventory.controller("users", function($scope, $rootScope, globalData, globalFunctions, userService){
	
	userService.users();
	$scope.users = globalData.users;
	
});
