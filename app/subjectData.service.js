angular.module('stundenplanApp')
  .factory('subjectDataService', function (days, hours, avaibleSubjects, localStorageService) {
    let data = {a: {}, b: {}}

    if (localStorageService.get("data") == null) {
        let temparray = {};
        let hoursobject = {};

        hours.forEach((e) => {
          hoursobject[e] = avaibleSubjects.Frei;
        })
        days.forEach((e) => {
          temparray[e] = hoursobject
        })
        data.a = JSON.parse(JSON.stringify(temparray)); // Clone the Object, so it does not have any references
        data.b = JSON.parse(JSON.stringify(temparray)); // Same for the b week
        localStorageService.set("data", data)
    } else {
      data = localStorageService.get("data");
      for (week in data) {
        for (day in data[week]) {
          for (hour in data[week][day]) {
            if (avaibleSubjects[data[week][day][hour].name] == undefined) {
              data[week][day][hour] = avaibleSubjects['Frei'];
              continue;
            }

            data[week][day][hour] = avaibleSubjects[data[week][day][hour].name];

          }
        }
      }
    }



    return {
      'getHour': (week, day, hour) => {

        return data[week][day][hour];
      },
      'setHour': (week, day, hour, subject) => {
        data[week][day][hour] = subject;
        localStorageService.set("data", data)
      },
      'saveData': () => {
        localStorageService.set("data", data)
      },
      'data': data
    }
  })
