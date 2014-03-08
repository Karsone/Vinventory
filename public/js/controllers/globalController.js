vinventory.controller("globalController", function($scope, $rootScope, globalData, globalFunctions, globalService){
	
	globalService.init();
	$scope.init = globalData.init;

});
