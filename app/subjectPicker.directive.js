angular.module('stundenplanApp')
  .directive('subjectPicker', function(subjectDataService, $compile)  {
    return {
      restrict: 'E',
      replace: 'false',
      template: `<p onclick="$(this).find('span').popover('toggle')" style="color: {{(subjectDataService.getHour(attrs.week, attrs.day, attrs.hour).color == 'white') ? 'black' : subjectDataService.getHour(attrs.week, attrs.day, attrs.hour).color}}">{{subjectDataService.getHour(attrs.week, attrs.day, attrs.hour).name}} <span class='glyphicon glyphicon-edit' aria-hidden='true' tabindex='0' data-trigger='manual'></span></p>`,
      scope: {},
      link: function(scope, elem, attrs){
        scope.subjectDataService = subjectDataService
        scope.attrs = attrs;
        scope.color = subjectDataService


        let placement = "right";
        if (attrs.day == "Mittwoch" || attrs.day == "Donnerstag" || attrs.day == "Freitag")  {
          placement = "left";
        }

        $(elem).find('span').popover({
          'placement': placement,
          html: true,
          content: $compile("<subject-Chooser day='{{attrs.day}}' week='{{attrs.week}}' hour='{{attrs.hour}}'></subject-Chooser>")(scope),
          title: "<span style='color: black'>Fach auswählen</span>"
        }).on('click', (e) => {
            e.preventDefault();
            return true;
        }).on('shown.bs.popover', () => {
          $(elem).find(".popover-content input").focus();
        }).on('show.bs.popover', () => {
          setTimeout(() => {
            let selectedSpan = $(elem).find('span');
            $('span').each(function(index) {
                if ($(this)[0] != selectedSpan[0]) {

                  $(this).popover('hide');
                }
            })
          }, 0)
        })



      }
    }
  })
