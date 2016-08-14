angular.module('stundenplanApp')
  .value('currentWeek', {'value': 1}) // Speicher für die ausgewählte Woche (in der Eingabe)
  .value('days', ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']) // Tage
  .value('hours', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']) // Stunden
  .value('avaibleSubjects',
    {'Frei': {'name': 'Frei', 'color': 'white'},

    'Französisch': {'name': 'Französisch', 'color': '	#00FFFF'},
    'Deutsch': {'name': 'Deutsch', 'color': '	#6495ED'},
    'Englisch': {'name': 'Englisch', 'color': '#1E90FF'},
    'Spanisch': {'name': 'Spanisch', 'color': '#008B8B'},

    'Mathe': {'name': 'Mathe', 'color': '	#FFD700'},
    'Physik': {'name': 'Physik', 'color': '#F0E68C'},
    'Biologie': {'name': 'Biologie', 'color': '#F4A460'},
    'Informatik': {'name': 'Informatik', 'color': '#DAA520'},
    'Chemie': {'name': 'Chemie', 'color': '#FFA500'},

    'Erdkunde': {'name': 'Erdkunde', 'color': '#00FF7F'},
    'Politik': {'name': 'Politik', 'color': '	#2E8B57'},
    'Pädagogik': {'name': 'Pädagogik', 'color': '#99FF33'},
    'Geschichte': {'name': 'Geschichte', 'color': '#00FF00'},
    'Sozialwis.': {'name': 'Sozialwis.', 'color': '#009900'},
    'LionsQuest': {'name': 'LionsQuest', 'color': '#7FFF00'},

    'Kunst': {'name': 'Kunst', 'color': '#9932CC'},
    'Musik': {'name': 'Musik', 'color': '#8B008B'},

    'Förder': {'name': 'Förder', 'color': '#A9A9A9'},
    'V-Mathe': {'name': 'V-Mathe', 'color': '#DCDCDC'},
    'V-Englisch': {'name': 'V-Englisch', 'color': '#DCDCDC'},

    'Religion': {'name': 'Religion', 'color': '#FFB6C1'},
    'Philosophie': {'name': 'Philosophie', 'color': '#FFB6C1'},

    'Sport': {'name': 'Sport', 'color': '#DC143C'},
    'Schwimmen': {'name': 'Schwimmen', 'color': '#BB2859'},
  }) // Verfügbare Fächer
