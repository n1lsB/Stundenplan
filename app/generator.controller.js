angular.module('stundenplanApp')
  .controller("generatorCtrl", function($scope, currentWeek, days, hours, subjectDataService, avaibleSubjects) {
    $scope.data = subjectDataService.data;

    $scope.week = currentWeek;
    $scope.days = days;
    $scope.hours = hours;
    $scope.toggleWeek = (target) => {
      if (target == "B") {
        currentWeek.value = 2
      } else {
        currentWeek.value = 1
      }
    }

    $scope.applyFromWeekA = () => {
      for (day in subjectDataService.data.a) {
        for (hour in subjectDataService.data.a[day]) {
          subjectDataService.data.b[day][hour] = avaibleSubjects[subjectDataService.data.a[day][hour].name]
        }
      }
      subjectDataService.saveData();
    }
    $scope.applyFromWeekB = () => {
      for (day in subjectDataService.data.a) {
        for (hour in subjectDataService.data.a[day]) {
          subjectDataService.data.a[day][hour] = avaibleSubjects[subjectDataService.data.b[day][hour].name]
        }
      }
      subjectDataService.saveData();
    }
    $scope.resetWeek = (week) => {
      for (day in subjectDataService.data[week]) {
        for (hour in subjectDataService.data[week][day]) {
          subjectDataService.data[week][day][hour] = avaibleSubjects.Frei
        }
      }
      subjectDataService.saveData();
    }
  });
