vinventory.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/views/partials/listUsers.htm',
      controller: 'listUsers'
    }).
    when('/listProducts', {
      templateUrl: '/views/partials/listProducts.htm',
      controller: 'listProducts'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);