vinventory.factory("globalService", function(globalData, globalFunctions){

	var init = function(callback){
		// http://pos.uswest.vin65.com/store/index.cfm?method=orders.listHeldOrders&maxRows=8&page=1÷
		// globalFunctions.http("INIT ENDPOINT",null,function(response){
		// 	angular.copy(response.products, globalData.products);
		// 	angular.copy(response.customers, globalData.customers);
		// 	(callback)(response);
		// });
	}
	return{
		init: 		init,
	};
});