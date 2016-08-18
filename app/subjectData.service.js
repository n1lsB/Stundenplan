angular.module('stundenplanApp')
  .factory('subjectDataService', function (days, hours, avaibleSubjects, localStorageService) {
    let data = {a: {}, b: {}, room: {}}

    if (localStorageService.get("data") == null) {
        data.room = {};
        ['a', 'b'].forEach(week => {
          data[week] = {};
          data.room[week] = {};
          days.forEach(day => {
            data[week][day] = {};
            data.room[week][day] = {};
            hours.forEach(hour => {
              data[week][day][hour] = avaibleSubjects.Frei;
              data.room[week][day][hour] = '';
            })
          })
        })
        localStorageService.set("data", data)
        console.log(data)
    } else {
      // There is already data
      data = localStorageService.get("data"); // Get Data from LocalStorage

      // Validating the Subject Names -> Is there an unknown Subject???
      ['a', 'b'].forEach(week => {
        for (day in data[week]) {
          for (hour in data[week][day]) {
            if (avaibleSubjects[data[week][day][hour].name] == undefined) {
              // Found an unknown Subject, replace it :-)
              data[week][day][hour] = avaibleSubjects['Frei'];
              continue;
            }
            data[week][day][hour] = avaibleSubjects[data[week][day][hour].name];
          }
        }
      })
      if (data.room == undefined) {
        data.room = {};
        ['a', 'b'].forEach(week => {
          data.room[week] = {};
          days.forEach(day => {
            data.room[week][day] = {};
            hours.forEach(hour => {
              data.room[week][day][hour] = '';
            })
          })
        })
      }
      console.log(data)
    }

    return {
      // Return a current Subject
      'getHour': (week, day, hour) => {
        return data[week][day][hour];
      },
      'setHour': (week, day, hour, subject) => {
        data[week][day][hour] = subject;
        localStorageService.set("data", data)
      },
      // Store temp 'data' in LocalStorage
      'saveData': () => {
        localStorageService.set("data", data)
      },
      'data': data
    }
  })
