

var esUrl = 'https://es.seestats.org/see-stats-2016.03.06';
var eventCountUrl = esUrl + '/raw/_count';

function formatNumber(number) {
  return $.number(number);
}

function setCounter(id, value) {
  $(id).text(formatNumber(value));
}

function getAllEventsCount() {
  $.ajax({
      url: eventCountUrl
  }).done(function(data) {
      setCounter('#all-events', data.count);
  });
}

function getSeestatsVisits() {
  $.ajax({
      url: eventCountUrl,
      json: {"filter": {"term": {"target": "https://seestats.org/game/smurfs" } }}
  }).done(function(data) {
      setCounter('#seestats-visits', data.count);
  });
}

setInterval(function () {
  getAllEventsCount();
  getSeestatsVisits();
}, 500);
