var splits;
var startedAt;
var pausedTime;
var pausedAt;

function readableTime(time) {
  var millis = Math.round(time % 1000 / 100) / 10;
  var seconds = Math.floor(time / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  var result = seconds + millis;
  if (minutes > 0 || hours > 0) {
    if (seconds < 10 ) { result = "0" + result; }
    result = minutes + ":" + result;
  }
  if (hours > 0) {
    if (minutes < 10) { result = "0" + result; }
    result = hours + ":" + result;
  }
  return result
}

function init() {
  splits = [];
  startedAt = Date.now();
  pausedTime = 0;
  pausedAt = undefined;
  redraw();
  $("button").css("display", "initial");
}

function runtime() {
  return (isPaused() ? pausedAt : Date.now()) - startedAt - pausedTime;
}

function redraw() {
  $("#counter")[0].innerHTML = splits.length;

  if (isPaused()) {
    $(".btn.btn-secondary").addClass("btn-warning");
  } else {
    $(".btn.btn-secondary").removeClass("btn-warning");
  }

  var table = "";
  var previous = splits[splits.length - 6];
  if (previous === undefined) { previous = 0; }
  splits.slice(-5).forEach(function(value, idx) {
    row = "<tr><td>" + (Math.max(splits.length - 4, 1) + idx) + "</td><td>" + readableTime(value) + "</td><td>";
    if (previous !== undefined) { row += readableTime(value - previous); }
    row += "</td></tr>";
    previous = value;
    table = row + table;
  });
  $("#lastSplits")[0].innerHTML = table;
}

function add() {
  splits.push(runtime());
  redraw();
}

function remove() {
  splits.pop();
  redraw();
}

function isPaused() {
  return pausedAt !== undefined
}

function pause() {
  if (isPaused()) { return; }
  pausedAt = Date.now();
  redraw();
}

function resume() {
  if (!isPaused()) { return; }
  pausedTime += Date.now() - pausedAt;
  pausedAt = undefined;
  redraw();
}
