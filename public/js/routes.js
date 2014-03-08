vinventory.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/views/partials/users.htm',
      controller: 'users'
    }).
    when('/listProducts', {
      templateUrl: '/views/partials/listProducts.htm',
      controller: 'listProducts'
    }).
    when('/modifyProducts', {
      templateUrl: '/views/partials/modifyProducts.htm',
      controller: 'modifyProducts'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);