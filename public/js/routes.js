vinventory.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/views/partials/users.htm',
      controller: 'users'
    }).
    when('/products', {
      templateUrl: '/views/partials/products.htm',
      controller: 'products'
    }).
    when('/modifyProducts', {
      templateUrl: '/views/partials/modifyProducts.htm',
      controller: 'modifyProducts'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);