

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
      url: 'https://api.seestats.org/getTodayHits'
  }).done(function(data) {
      setCounter('#seestats-visits', data.count);
  });
}

function getTopTargets() {
  $.ajax({
    url: 'https://api.seestats.org/getTopTargets'
  }).done(function (data) {
    $('.top-targets').html('');
    $.each(data.count, function (key, value) {

      $('.top-targets').append('<tr><td></td><td>' + value.key + '</td><td>' + value.doc_count + '</td></tr>')
    });
  });
}

setInterval(function () {
  getAllEventsCount();
  getSeestatsVisits();
  getTopTargets();
}, 500);
