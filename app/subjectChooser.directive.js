angular.module('stundenplanApp')
  .directive('subjectChooser', function(avaibleSubjects, subjectDataService, $timeout, $compile)  {
    return {
      restrict: 'E',
      replace: 'false',
      template: (`<div style="color: black"><input type="text" ng-model="search" placeholder="Suchen..."/><br><br><p ng-repeat='(k,v) in avaibleSubjects | subjectFilter: search:this' ng-click="setHour(v)" ng-class='v == currentSubject[attrs.hour].name ? "active" : ""' style="color: {{(avaibleSubjects[v].color == 'white') ? 'black' : avaibleSubjects[v].color}}">{{v}}<br></p></div>`),

      link: function(scope, elem, attrs) {
          scope.attrs = attrs;
          scope.avaibleSubjects = avaibleSubjects;
          scope.currentSubject = subjectDataService.data[attrs.week][attrs.day];
          scope.setHour = function(name) {
            scope.search = "";
            subjectDataService.setHour(attrs.week, attrs.day, attrs.hour, avaibleSubjects[name]);
            $timeout(() => {
                $(elem).parent().parent().parent().find("span").popover('hide');
            }, 0, false)
          }
          $(elem).find('input').on('input', () => {
                $(elem).parent().parent().parent().find("span").popover('show');
          })
      }
    }
  })
