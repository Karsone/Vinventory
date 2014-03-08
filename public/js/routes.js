vinventory.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'users.htm',
      controller: 'users'
    }).
    when('/products', {
      templateUrl: 'products.htm',
      controller: 'products'
    }).
    when('/manageProducts', {
      templateUrl: '/views/partials/manageProducts.htm',
      controller: 'manageProducts'
    }).
    when('/settings', {
      templateUrl: '/views/partials/settings.htm'
    }).
    when('/test', {
      templateUrl: 'template1.html'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);