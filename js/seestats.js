

var esUrl = 'https://es.seestats.org/see-stats-2016.03.06';
var eventCountUrl = esUrl + '/raw/_count';

function getAllEventsCount() {
  $.ajax({
      url: eventCountUrl
  }).done(function(data) {
      $('#all-events').text(data.count);
  });
}

setInterval(getAllEventsCount, 500);
