angular.module('stundenplanApp')
  .filter('subjectFilter', function () {
      return function (items, search, scope) {

          var result = [];
          search = search ? search : "";
          angular.forEach(items, function (value, key) {
              angular.forEach(value, function (value2, key2) {
                  if (value2.toLowerCase().startsWith(search.toLowerCase()) && key2 == "name" && value2 != scope.currentDay[scope.attrs.hour].name) {
                      result.push(value2);
                  } else if (value2.toLowerCase().startsWith(search.toLowerCase()) && key2 == "name" && value2 == scope.currentDay[scope.attrs.hour].name) {

                      result.unshift(value2)
                  }
              })
          });
          return result;

      }
  });
