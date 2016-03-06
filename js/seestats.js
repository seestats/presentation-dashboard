

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

function getUniqueTargets()
{
  $.ajax({
      url: 'https://api.seestats.org/getUniqueTargets'
  }).done(function(data) {
      setCounter('#unique-targets', data.count);
  });
}

function getAllTraffic()
{
  $.ajax({
      url: 'https://api.seestats.org/currentlyActiveConnection'
  }).done(function(data) {
      setCounter('#seestats-traffic', data.count/1024/1024);
  });
}

function getAllResponseCodes()
{
  $.ajax({
    url: 'https://api.seestats.org/statusCodeList'
  }).done(function (data) {
    status_codes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', "Q"];
    $('.top-status-codes').html('');
    $.each(data.count, function (key, value) {
      $('.top-status-codes').append('<tr><td></td><td>' + status_codes[key] + '</td><td>' + value.doc_count + '</td></tr>');
    });
  });
}

setInterval(function () {
  getAllEventsCount();
  getSeestatsVisits();
  getTopTargets();
  getUniqueTargets();
  getAllTraffic();
  getAllResponseCodes();

}, 500);
