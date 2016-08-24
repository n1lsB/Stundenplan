// A simple Bounce-Loader directive.
angular.module('stundenplanApp')
  .run(function($rootScope) {
    $rootScope.isRouteLoading = false;
  })
  .directive('loadingScreen', function($rootScope, $timeout){
    return {
      restrict:'E',
      template:`<div ng-show="isRouteLoading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div><h2 style="text-align:center">Bitte warten...</h2></div>`,
      link: function(scope, elem, attrs){
        scope.$on('$routeChangeStart', function(){
            $rootScope.isRouteLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function(){
          $timeout(function () {
              // Timeout is called when Rendered (next digest circle.)
              $rootScope.isRouteLoading = false;
          });

        });
    }
  };
});
