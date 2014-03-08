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
    when('/manageProducts', {
      templateUrl: '/views/partials/manageProducts.htm',
      controller: 'manageProducts'
    }).
    when('/settings', {
      templateUrl: '/views/partials/settings.htm'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);