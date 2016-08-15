angular.module('stundenplanApp')
  .directive('subjectPicker', function(subjectDataService, $compile, avaibleSubjects)  {
    return {
      restrict: 'E',
      replace: 'false',
      template: `
                <select style="background-color: {{currentDay[attrs['hour']].color}}">
                  <option ng-repeat="(k,v) in avaibleSubjects | subjectFilter: '':this"
                          ng-selected="v == currentDay[attrs['hour']].name"
                          style="color: {{(avaibleSubjects[v].color != 'white') ? avaibleSubjects[v].color : 'black'}};
                                 background-color: white;"
                          >{{v}}</option>
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
            subjectDataService.data[attrs['week']][attrs['day']][attrs['hour']] = avaibleSubjects[newSubject];
          })
        })
      }
    }
  })
