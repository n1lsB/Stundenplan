angular.module('stundenplanApp')
  .directive('subjectPicker', function(subjectDataService, $compile, avaibleSubjects)  {
    return {
      restrict: 'E',
      replace: 'false',
      template: `<div>

                <select style="background-color: {{currentDay[attrs['hour']].color}};
                               color: {{getFontColor()}}">
                  <option ng-repeat="(k,v) in avaibleSubjects | subjectFilter: '':this"
                          ng-selected="v == currentDay[attrs['hour']].name"
                          style="color: {{ColorLuminance(avaibleSubjects[v].color, -0.3)}};
                                 background-color: white;"
                          >{{v}}</option>
                </select>
                <input type="text" placeholder="Raum" size="5" ng-if="currentDay[attrs['hour']].name != 'Frei'" ng-model="data.data.room[attrs['week']][attrs['day']][attrs['hour']]"></input>
                </div>
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
            subjectDataService.saveData(); // Don't forget to save into LocalStorage :D
          })
        })

        scope.getFontColor = () => {
          let hexCode = scope.currentDay[attrs['hour']].color;
          let rgb = hexToRgb(hexCode);
          // if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 else use #ffffff
          if ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 130) {
            return "#000000";
          } else {
            return "#ffffff";
          }
        }
        scope.ColorLuminance = (x, y) => {
          return ColorLuminance(x, y);
        }
      }
    }
  })
