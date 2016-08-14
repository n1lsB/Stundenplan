angular.module('stundenplanApp')
  .controller("exportController", function ($scope, hours, days, subjectDataService) {
    $scope.hours = hours;
    $scope.days = days;
    $scope.data = subjectDataService;

    let data = $scope.data;

    $scope.getWidth = (scope, week) => {
      return scope.getColspan(scope, week) == '2' ? '170' : '85';
    }

    $scope.getHeight = (scope, week) => {
      return scope.getRowspan(scope, week) == '2' ? '60' : '30'
    }

    $scope.getRowspan = (scope, week) => {
        return getRowspan(week, scope.day, scope.hour);
    }
    $scope.getColspan = (scope, week) => {
        if (week == 'a') {
          if (scope.hour % 2 == 1) {
            if (scope.getRowspan(scope, week) == 2) {
              return !checkShowing('b', scope.day, scope.hour) && !checkShowing('b', scope.day, scope.hour*1 + 1) ? '2' : '1';
            } else {
              return (!checkShowing('b', scope.day, scope.hour)) ? '2': '1';
            }
          } else {
            return (!checkShowing('b', scope.day, scope.hour) && (getRowspan('b', scope.day, scope.hour*1 - 1) == 1 || !checkShowing('b', scope.day, scope.hour*1 - 1))) ? '2' : '1' ;
          }
        } else {
          return 1;
        }
    }

    $scope.checkShowing = (scope, week) => {
      return checkShowing(week, scope.day, scope.hour);
    }

    let checkShowing = (week, day, hour) => {
      if (hour % 2 == 1) {
        // Ungerade Stunde, eg. 1, 3, 5
        if (week == 'a') {
          return true;
        } else {
          if (data.getHour('a', day, hour).name == data.getHour('a', day, hour*1 + 1).name &&
              data.getHour('a', day, hour).name == data.getHour('b', day, hour).name &&
              data.getHour('b', day, hour).name != data.getHour('b', day, hour*1 + 1).name) {
              return true;
          } else if (data.getHour('a', day, hour).name != data.getHour('a', day, hour*1 + 1).name &&
              data.getHour('a', day, hour).name == data.getHour('b', day, hour).name &&
              data.getHour('b', day, hour).name == data.getHour('b', day, hour*1 + 1).name) {

              return true;
          } else {
            return  data.getHour('a', day, hour).name != data.getHour('b', day, hour).name;
          }
        }
      } else {
        // Gerade Stunde
        if (week == 'a') {
          return data.getHour('a', day, hour).name != data.getHour('a', day, hour*1 - 1).name
        } else {
          return (data.getHour('a', day, hour*1 - 1) == data.getHour('a', day, hour) ||
              data.getHour('b', day, hour).name != data.getHour('a', day, hour).name) &&
              data.getHour('b', day, hour).name != data.getHour('b', day, hour*1 - 1).name
        }
      }
    }
    let getRowspan = (week, day, hour) => {
      if (hour % 2 == 1) {
        // Ungerade Woche, eg. 1, 3, 5
        return !checkShowing(week, day, hour*1 + 1) ? '2' : '1'
      } else {
        return 1;
      }
    }

    $scope.hasContent = (hour) => {
      let lastline = 0;
      for (week in data.data) {
        for (day in data.data[week]) {
          for (_hour in data.data[week][day]) {

            if (data.data[week][day][_hour].name != "Frei") {

              if (lastline*1 < _hour*1)
                lastline = _hour;
            }
          }
        }
      }

      if (lastline % 2 == 1) {
        lastline = lastline*1 + 1;
      }

      return hour*1 <= lastline*1;
    }
  })
