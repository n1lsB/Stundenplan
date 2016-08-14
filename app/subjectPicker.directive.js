angular.module('stundenplanApp')
  .directive('subjectPicker', function(subjectDataService, $compile, avaibleSubjects)  {
    return {
      restrict: 'E',
      replace: 'false',
      template: `
                <select>
                  <option ng-repeat="(k,v) in avaibleSubjects | subjectFilter: '':this"
                          ng-selected="v == currentDay[attrs['hour']].name"
                          >
                          {{v}}
                  </option>
                </select>
                `,
      scope: {},
      link: function(scope, elem, attrs){
        scope.data = subjectDataService
        scope.attrs = attrs;
        scope.color = subjectDataService
        scope.avaibleSubjects = avaibleSubjects;
        scope.currentDay = subjectDataService.data[attrs['week']][attrs['day']];

        $(elem).change(function() {
          let newSubject = $(elem).find('option:selected').text();
          scope.$apply(() => {
            scope.currentDay[attrs['hour']] = avaibleSubjects[newSubject];
          })
        })
      }
    }
  })
