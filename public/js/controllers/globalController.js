vinventory.controller("globalController", function($scope, $rootScope, globalData, globalFunctions, globalService, $location){
	
	globalService.init();
	$scope.init = globalData.init;


	$scope.openView = function(view){
		$location.path(view);
	}

});
